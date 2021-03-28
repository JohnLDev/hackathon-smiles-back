'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to smiles challenges' }
})
Route.resource('/user', 'UserController')
Route.post('/complete-challenge/:id', 'UserController.completeChallenge')
Route.post('/select-reward/:id', 'UserController.selectReward')
Route.post('/retrive-reward', 'UserController.retriveReward')
Route.resource('/session', 'SessionController')
Route.resource('/challenge', 'ChallengeController')
Route.resource('/reward', 'RewardController')
