// const { AuthenticationError, ForbiddenError } = require('./utils/errors');

// const resolvers = {
//   // TODO: fill in resolvers
//   Query: {
//     bookingsForListing: async (_, { listingId, status }, { dataSources, userId, userRole }) => {
//       if (!userId) throw AuthenticationError()
//       if (userRole === "Host") {
//         //need to check i listing belongs to host
//         const listings = await dataSources.listingsAPI.getListingsForUser(userId)
//         if (listings.find((listing) => {
//           return parseInt(listing._id) == parseInt(listingId);
//         }))
//           return await dataSources.bookingsAPI.getBookingsByStatusAndListing({
//             status: "Pending",
//             listing_id: listingId
//           }) || []
//         else throw new Error("You are not authorized for this action")
//       }
//     },
//     guestBookings: async (_, __, { dataSources, userId, userRole }) => {
//       console.log('guest booking', userId, userRole)
//       if (userId) throw AuthenticationError()
//       if (userRole = "Host") throw new AuthenticationError("only guest can book")
//       const bookings = await dataSources.bookingsAPI.getBookingsForUser(
//         userId

//       )
//       return bookings
//     },
//     upcomingGuestBookings: async (_, __, { dataSources, userId, userRole }) => {
//       if (!userId) throw AuthenticationError()
//       if (userRole = "Host") throw new ForbiddenError("only guest can book")
//       const bookings = await dataSources.bookingsAPI.getBookingsForUser(userId, "UPCOMING")
//       return bookings
//     },
//     pastGuestBookings: async (_, __, { dataSources, userId, userRole }) => {
//       if (!userId) { throw AuthenticationError() }
//       if (userRole == "Host") {
//         throw new ForbiddenError("Only Guest Can Book")
//       }
//       let bookings = await dataSources.bookingsAPI.getBookingsForUser(userId, 'COMPLETED')
//       return bookings
//     },
//   },

//   Mutation: {
//     createBooking: async (_, { createBookingInput }, { dataSources, userId }) => {
//       if (!user || !user.isVerified) {
//         throw new AuthenticationError(`you must be loggedin and verified`);
//       };
//       const { listingId, checkInDate, checkOutDate } = createBookingInput
//       const { totalCost } = await dataSources.listingsAPI.getTotalCost({
//         id: listingId,
//         checkInDate,
//         checkOutDate
//       })
//       try {
//         await dataSources.paymentsAPI.subtractFunds({
//           userId,
//           amount: totalCost
//         })
//       } catch (error) {
//         return {
//           code: 400,
//           message: `Payment failed ${error}`,
//           success: false
//         }
//       }

//       try {
//         const booking = await dataSources.bookingsAPI.createBooking({
//           listingId,
//           checkInDate,
//           checkOutDate,

//           totalCost,
//           guests: userId,
//         })


//         return {
//           code: 200,
//           success: true,
//           message: 'booking created successfully',
//           booking
//         }
//       } catch (error) {
//         return {
//           code: 400,
//           message: "failed to book", success: false,
//           success: false
//         }
//       }
//     }
//   },
//   Booking: {
//     listing: ({ listingId }) => {
//       return { id: listingId };
//     },
//     checkInDate: ({ checkInDate }, _, { dataSources }) => {
//       // if(typeof Date.parse() ==='function'){
//       //   // console.log('date parse function')
//       //   let date=new Date();
//       //   var today = new Date().toISOString().slice(0,10);
//       //   if((today>checkInDate)){
//       //     throw Error("Check in date can't be less than current day")
//       //     }else{return checkInDate;}
//       //     } else
//       //     {
//       //       //console.log('no date parse function');
//       //       return checkInDate;
//       //       };
//       return dataSources.bookingsAPI.getHumanReadableDate(checkInDate)
//     },
//     checkOutDate: (parent, { checkOutDate }, { dataSources }) => {
//       return dataSources.bookingsAPI.getHumanReadableDate(checkOutDate)
//     },
//     guest: ({ guestId }) => {
//       return { id: guestId }
//     },
//     totalPrice: async ({ listingId, checkInDate, checkOutDate }, _, { dataSources }) => {
//       const { totalCost } = dataSources.listingsAPI.getTotalCost({
//         id: listingId,
//         checkin_date: checkInDate,
//         checkout_date: checkOutDate
//       })
//       return totalCost
//     }
//   },
//   Listing: {
//     bookings: async ({ id }, _, { dataSources }) => {
//       const allBookings = await dataSources.bookingsAPI.getBookingsForListing(id)
//     }

//   }
// }
// module.exports = resolvers;

const { AuthenticationError, ForbiddenError } = require('./utils/errors');

const resolvers = {
  Query: {
    //TODO bookings
    guestBookings: async (_, __, { dataSources, userId, userRole }) => {
      if (!userId) throw AuthenticationError();
      if (userRole === "Guest") {
        const bookings = await dataSources.bookingsAPI.getBookingsForUser(
          userId
        );
        return bookings;
      } else {
        throw ForbiddenError("Only guests have access to trips");
      }
    },
    upcomingGuestBookings: async (_, __, { dataSources, userId, userRole }) => {
      if (!userId) throw AuthenticationError();

      if (userRole === "Guest") {
        const bookings = await dataSources.bookingsAPI.getBookingsForUser(
          userId,
          "UPCOMING"
        );

        return bookings;
      } else {
        throw ForbiddenError("Only guests have access to trips");
      }
    },
    pastGuestBookings: async (_, __, { dataSources, userId, userRole }) => {
      if (!userId) throw AuthenticationError();

      if (userRole === "Guest") {
        const bookings = await dataSources.bookingsAPI.getBookingsForUser(
          userId,
          "COMPLETED"
        );
        return bookings;
      } else {
        throw ForbiddenError("Only guests have access to trips");
      }
    },
    bookingsForListing: async (
      _,
      { listingId, status },
      { dataSources, userId, userRole }
    ) => {
      if (!userId) throw AuthenticationError();

      if (userRole === "Host") {
        // need to check if listing belongs to host
        const listings = await dataSources.listingsAPI.getListingsForUser(
          userId
        );

        // const listings =
        if (listings.find((listing) => listing.id === listingId)) {
          const bookings =
            (await dataSources.bookingsAPI.getBookingsForListing(
              listingId,
              status
            )) || [];
          return bookings;
        } else {
          throw new Error("Listing does not belong to host");
        }
      } else {
        throw ForbiddenError("Only hosts have access to listing bookings");
      }
    },
  },
  Mutation: {
    // booking mutation
    createBooking: async (
      _,
      { createBookingInput },
      { dataSources, userId }
    ) => {
      if (!userId) throw AuthenticationError();

      const { listingId, checkInDate, checkOutDate } = createBookingInput;
      const { totalCost } = await dataSources.listingsAPI.getTotalCost({
        id: listingId,
        checkInDate,
        checkOutDate,
      });

      try {
        await dataSources.paymentsAPI.subtractFunds({
          userId,
          amount: totalCost,
        });
      } catch (e) {
        return {
          code: 400,
          success: false,
          message:
            "We couldn’t complete your request because your funds are insufficient.",
        };
      }

      try {
        const booking = await dataSources.bookingsAPI.createBooking({
          listingId,
          checkInDate,
          checkOutDate,
          totalCost,
          guestId: userId,
        });

        return {
          code: 200,
          success: true,
          message: "Successfully booked!",
          booking,
        };
      } catch (err) {
        return {
          code: 400,
          success: false,
          message: err.message,
        };
      }
    },
  },
  Booking: {
    // nice example of pulling the listing in here for each booking
    listing: ({ listingId }) => {
      return { id: listingId };
    },
    checkInDate: ({ checkInDate }, _, { dataSources }) => {
      return dataSources.bookingsAPI.getHumanReadableDate(checkInDate);
    },
    checkOutDate: ({ checkOutDate }, _, { dataSources }) => {
      return dataSources.bookingsAPI.getHumanReadableDate(checkOutDate);
    },
    guest: ({ guestId }) => {
      return { id: guestId };
    },
    totalPrice: async (
      { listingId, checkInDate, checkOutDate },
      _,
      { dataSources }
    ) => {
      const { totalCost } = await dataSources.listingsAPI.getTotalCost({
        id: listingId,
        checkInDate,
        checkOutDate,
      });
      return totalCost;
    },
  },
  Listing: {
    // this is for populating the data booking for the listing nice example
    bookings: async ({ id }, _, { dataSources }) => {
      return await dataSources.bookingsAPI.getBookingsForListing(id);
    },
  },
};

module.exports = resolvers;

