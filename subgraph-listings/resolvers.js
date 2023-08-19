// const { AuthenticationError, ForbiddenError } = require('./utils/errors')

// const resolvers = {
//   // TODO: fill in resolvers
//   Query: {
//     listing: async (_, { id }, { dataSources }) => {
//       const listings = await dataSources.listingAPI.getListing({ id })
//     },
//     featuredListings: async (_, __, { dataSources }) => {
//       const limit = 3
//       return await dataSources.listingAPI.getFeaturedListings(limit)
//     },

//     hostingListings: async (_, __, { dataSources, userId, userRole }) => {
//       if (!userId) {
//         throw new AuthenticationError('you must be loggedin to see this')
//       }
//       if (userRole === 'Host') {
//         return await dataSources.listingAPI.getListingsForUser(userId)
//       } else {
//         throw new ForbiddenError('You are not authorized')
//       }
//     },

//     listingAmenities: async (_, __, { dataSources }) => {
//       return dataSources.listingAPI.getAllAmenities()
//     },
//     searchListings: async (_, { criteria }, { dataSources }) => {
//       let { numOfBed, checkInDate, checkOutDate, page, limit, sortBy } =
//         criteria
//       // page=parseInt(page)||1 ;
//       // limit= parseInt(limit)||50
//       // checkInDate=(new Date(`${checkInDate}`)).toISOString();
//       // checkOutDate =(new Date(`${checkOutDate}`)).toISOString();
//       // console.log(`Search Criteria ${JSON.stringify([numOfBed ,checkInDate])}`)
//       let listings = await dataSources.listingsAPI.getListings({
//         // numOfBed : numOfBed || null});
//         // for (var i of listings){
//         //   var date1 = new Date(i["createdAt"]);
//         //   var date2 = new Date(i['updatedAt']);
//         //   if((date1 < checkInDate && date2 > checkInDate)){
//         //     delete listings[i]
//         //     };
//         numOfBed,
//         page,
//         limit,
//         sortBy
//       })
//       //check availability for each listing
//       let listingAvailability = await Promise.all(
//         listings.map(listing =>
//           dataSources.bookingsAPI.isListingAvailable({
//             listingId: listing.id,
//             checkInDate,
//             checkOutDate
//           })
//         )
//       )
//       // filter listings data based on availability
//       const availableListings = listings.filter(
//         (listing, index) => listingAvailability[index]
//       )
//       return availableListings
//     }
//   },
//   Mutation: {
//     //Listings
//     //"Creates a new listing for the currently authenticated host"
//     createListing: async (
//       _,
//       { CreateListingInput },
//       { dataSources, userId, userRole }
//     ) => {
//       if (!userId) throw AuthenticationError()

//       if (userRole === 'Host') {
//         try {
//           const newListing = await dataSources.listingsAPI.createListing({
//             ...CreateListingInput,
//             ...{ host: { connect: { id: `${userId}` } } }
//           })
//           return {
//             message: 'New Listing Created',
//             code: 200,
//             success: true,
//             payload: [{ ...newListing }]
//           }
//         } catch (error) {
//           throw error
//           return {
//             code: 400,
//             success: false,
//             message: 'Invalid Input'
//           }
//         }
//       } else {
//         return {
//           code: 400,
//           success: false,
//           message: 'You are not authorized to perform this action.'
//         }
//       }
//     },
//     updateListing: async (
//       _,
//       { updateListingInput, listingId },
//       { dataSources, userId },
//       info
//     ) => {
//       console.log('Update Listings')
//       if (!userId) throw AuthenticationError()
//       try {
//         const updatedListing = await dataSources.listingsAPI.updateListing({
//           listingId,
//           updateListingInput
//         })
//         return {
//           message: 'Updated Successfully!',
//           code: '201',
//           success: true,
//           payload: [updatedListing]
//         }
//       } catch (e) {
//         console.log('err', e)
//       }
//     },
//     Listing: {
//       __resolverReference: async ({ id }, { dataSources }) => {
//         // console.log(id,"listing id")
//         let result = await dataSources.listingsAPI.getListing(id)
//         return { ...result }
//       }
//     },
//     host: ({ hostId }) => {
//       return { id: hostId }
//     },
//     totalCost: async (
//       { id },
//       { checkInDate, checkOutDate },
//       { dataSources }
//     ) => {
//       const { totalCost } = dataSources.listingsAPI.getTotalCost({
//         id,
//         checkInDate,
//         checkOutDate
//       })
//       return totalCost
//     },
//     amenities: async ({ id }, _, { dataSources }) => {
//       const res = await dataSources.listingsAPI.getListing(id)
//       // var arr=[]
//       // for(let i of Object.keys(res)){
//       //   if(!isNaN(+i))arr[Object.values(res)[+i]]=true;
//       //   }
//       return res.amenities
//     },
//     currentlyBookedDates: async ({ id }, _, { dataSources }) => {
//       const bookedDates =
//         await dataSources.bookingsAPI.getCurrentlyBookedDatesForHost(id, {
//           limit: '5'
//         })
//       return bookedDates
//     },
//     bookings: async ({ id }, _, { dataSources }) => {
//       return dataSources.bookingsAPI.getBookingsForListing(id)
//     },
//     numberOfUpcomingBookings: async ({ id }, _, { dataSources }) => {
//       const upcomingBookings =
//         (await dataSources.bookingsAPI.getNumberOfUpcomingBookingsByListingIDAndStatus(
//           id,
//           'UPCOMING'
//         )) || []
//       return bookings.length
//     },
//     coordinates: async ({ id }, _, { dataSources }) => {
//       return dataSources.listingsAPI.getListingCoordinates(id)
//     }
//   },
//   AmenityCategory: {
//     ACCOMMODATION_DETAILS: 'Accommodation Details',
//     SPACE_SURVIVAL: 'Space Survival',
//     OUTDOORS: 'Outdoors'
//   }
// }
// module.exports = resolvers

const { AuthenticationError, ForbiddenError } = require("./utils/errors");

const resolvers = {
  // TODO: fill in resolvers
  Query: {
    listing: (_, { id }, { dataSources }) => {
      return dataSources.listingsAPI.getListing(id);
    },

    hostListings: async (_, __, { dataSources, userId, userRole }) => {
      if (!userId) throw AuthenticationError();

      if (userRole === "Host") {
        return dataSources.listingsAPI.getListingsForUser(userId);
      } else {
        throw ForbiddenError("Only hosts have access to listings.");
      }
    },
    featuredListings: async (_, __, { dataSources }) => {
      const limit = 3;
      const data = await dataSources.listingsAPI.getFeaturedListings(limit);
      return data;
    },
    listingAmenities: (_, __, { dataSources }) => {
      return dataSources.listingsAPI.getAllAmenities();
    },

    searchListings: async (_, { criteria }, { dataSources }) => {
      const { numOfBeds, checkInDate, checkOutDate, page, limit, sortBy } =
        criteria;
      const listings = await dataSources.listingsAPI.getListings({
        numOfBeds,
        page,
        limit,
        sortBy,
      });
      // check availability for each listing
      const listingAvailability = await Promise.all(
        listings.map((listing) =>
          dataSources.bookingsAPI.isListingAvailable({
            listingId: listing.id,
            checkInDate,
            checkOutDate,
          })
        )
      );

      // filter listings data based on availability
      const availableListings = listings.filter(
        (listing, index) => listingAvailability[index]
      );

      return availableListings;
    },
  },
  Mutation: {
    // Listings Mutation
    createListing: async (
      _,
      { listing },
      { dataSources, userId, userRole }
    ) => {
      if (!userId) throw AuthenticationError();
      const {
        title,
        description,
        photoThumbnail,
        numOfBeds,
        costPerNight,
        locationType,
        amenities,
      } = listing;

      if (userRole === "Host") {
        try {
          const newListing = await dataSources.listingsAPI.createListing({
            title,
            description,
            photoThumbnail,
            numOfBeds,
            costPerNight,
            hostId: userId,
            locationType,
            amenities,
          });

          return {
            code: 200,
            success: true,
            message: "Listing successfully created!",
            listing: newListing,
          };
        } catch (err) {
          console.log(err);
          return {
            code: 400,
            success: false,
            message: err.message,
          };
        }
      } else {
        return {
          code: 400,
          success: false,
          message: "Only hosts can create new listings",
        };
      }
    },
    updateListing: async (
      _,
      { listingId, listing },
      { dataSources, userId }
    ) => {
      if (!userId) throw AuthenticationError();
      try {
        const updatedListing = await dataSources.listingsAPI.updateListing({
          listingId,
          listing,
        });

        return {
          code: 200,
          success: true,
          message: "Listing successfully updated!",
          listing: updatedListing,
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
  Listing: {
    // nice example of sending the listing to each booking booking
    __resolveReference: ({ id }, { dataSources }) => {
      return dataSources.listingsAPI.getListing(id);
    },
    host: ({ hostId }) => {
      return { id: hostId };
    },
    totalCost: async (
      { id },
      { checkInDate, checkOutDate },
      { dataSources }
    ) => {
      const { totalCost } = await dataSources.listingsAPI.getTotalCost({
        id,
        checkInDate,
        checkOutDate,
      });
      return totalCost;
    },
    amenities: async ({ id }, _, { dataSources }) => {
      const data = await dataSources.listingsAPI.getListing(id);
      return data.amenities;
    },
    currentlyBookedDates: ({ id }, _, { dataSources }) => {
      return dataSources.bookingsAPI.getCurrentlyBookedDateRangesForListing(id);
    },
    bookings: ({ id }, _, { dataSources }) => {
      return dataSources.bookingsAPI.getBookingsForListing(id);
    },
    numberOfUpcomingBookings: async ({ id }, _, { dataSources }) => {
      const bookings =
        (await dataSources.bookingsAPI.getBookingsForListing(id, "UPCOMING")) ||
        [];
      return bookings.length;
    },
    coordinates: ({ id }, _, { dataSources }) => {
      return dataSources.listingsAPI.getListingCoordinates(id);
    },
  },
  AmenityCategory: {
    ACCOMMODATION_DETAILS: "Accommodation Details",
    SPACE_SURVIVAL: "Space Survival",
    OUTDOORS: "Outdoors",
  },
};

module.exports = resolvers;


