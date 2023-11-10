const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const locationRoute = require('./locations.route');
const StateRoute = require('./state.route');
const productRoute = require('./product.route');
const tourist = require('./tourist.route');
const imageRoute = require('./image.route');
const CategoryRoute = require('./category.route');
const BudgetUserRoute = require('./budgetUser.route');
const DeleciousRoute = require('./Delecious.route');
const DrawingRoute = require('./Drawing.route');
const BudgetRouter = require('./BudgetLimit.router')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/drawing',
    route: DrawingRoute,
  },
  {
    path: '/budgetLimit',
    route: BudgetRouter,
  },
  {
    path: '/budgetUser',
    route: BudgetUserRoute,
  },
  {
    path: '/location',
    route: locationRoute,
  },
  {
    path: '/DeleciousApp',
    route: DeleciousRoute,
  },
  {
    path: '/category',
    route: CategoryRoute,
  },
  {
    path: '/tourist',
    route: tourist,
  },
  {
    path: '/state',
    route: StateRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/image',
    route: imageRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
