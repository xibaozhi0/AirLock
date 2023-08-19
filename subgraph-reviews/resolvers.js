const { AuthenticationError, ForbiddenError } = require('./utils/errors')

const resolvers = {
  // TODO: fill in resolvers
  Query: {
    review: async ({ id }, _, { dataSources }) => {
      const reviews = await dataSources.reviewsAPI.getReview(id)
      return reviews
    }
  },
  Mutation: {
    sumitHostAndLocationReviews: async (
      _,
      { bookingId, hostReview, locationReview },
      { dataSources, userId }
    ) => {
      if (!userId) throw AuthenticationError()
      const listingId = await dataSources.bookingsAPI.getListingIdForBooking(
        bookingId
      )
      const createdLocationReview =
        await dataSources.reviewsAPI.createReviewForListing({
          bookingId,
          listingId,
          authorId: userId,
          text: locationReview.text,
          rating: locationReview.rating
        })
      const { hostId } = await dataSources.listingAPI.getListing(listingId)
      const createdHostReview =
        await dataSources.reviewsAPI.createReviewForHost({
          bookingId,
          hostId,
          authorId: userId,
          text: hostReview.text,
          rating: hostReview.rating
        })
      return {
        code: 200,

        success: true,
        message: 'review added',
        createdLocationReview,
        createdHostReview,
        hostReview: createdHostReview,
        locationReview: createdLocationReview
      }
    },
    submitGuestReview: async (
      _,
      { bookingId, guestReview },
      { dataSources, userId }
    ) => {
      if (userId) throw AuthenticationError()
      let { rating, text } = guestReview
      let guestId = await dataSources.bookingsAPI.getGuestIdForBooking(
        bookingId
      )
      let createdReview = await dataSources.reviewAPI.createReviewForGuest({
        bookingId,
        guestId,
        authorId: userId,
        text,
        rating
      })
      return {
        code: 201,
        success: true,
        message: 'review submitted',
        guestReview: createdReview
      }
    }
  },
  Listing: {
    overallRating: async ({ id }, _, { dataSources }) => {
      return dataSources.reviewsAPI.getOverallRatingForListing(id)
    },
    reviews: async ({ id }, _, { dataSources, userId }) => {
      return dataSources.reviewsAPI.getReviewsForListing(id)
    }
  },
  Booking: {
    locationReview: async ({ id }, _, { dataSources }) => {
      return dataSources.reviewsAPI.getReviewForBooking('LISTING', id)
    },
    hostReview: async ({ id }, _, { dataSources }) => {
      return dataSources.reviewsAPI.getReviewForBooking('HOST', id)
    },
    guestReview: async ({ id }, _, { dataSources }) => {
      return dataSources.reviewsAPI.getReviewForBooking('GUEST', id)
    }
  },
  Host: {
    overallRating: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsAPI.getOverRatingForHost(id)
    }
  },
  Review: {
    author: review => {
      let role = ''
      if (review.targetType === 'LISTING' || review.targetType === 'HOST') {
        role = 'Guest'
      } else {
        role = 'Host'
      }
      return { __typename: role, id: review.authorId }
    }
  }
}

module.exports = resolvers
