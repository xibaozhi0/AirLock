const { AuthenticationError, ForbiddenError } = require('./utils/errors')

const resolvers = {
  // TODO: fill in resolvers
  Query: {
    payment: () => 1001
  },
  Mutation: {
    addFundsToWallet: async (_, __, { dataSources, userId, amount }) => {
      if (!userId) {
        throw new AuthenticationError('You must be logged to do this!')
      }

      try {
        const updatedWallet = await dataSources.paymentAPI.addFunds({
          userId,
          amount
        })

        return {
          code: 200,
          success: true,
          message: 'fund added successfully',
          amount: updatedWallet
        }
      } catch (error) {
        return {
          code: 400,
          success: false,
          message: error.message
        }
      }
    }
  },
  Guest: {
    funds: async (_, __, { dataSources, userId }) => {
      const { amount } = await dataSources.paymentAPI.getUserWalletAmount(
        userId
      )
      return amount
    }
  }
}

module.exports = resolvers
