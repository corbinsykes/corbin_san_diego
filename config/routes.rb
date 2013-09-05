CorbinSanDiego::Application.routes.draw do

  get '/' => 'welcome#index'

  post '/leaderboard' => 'welcome#leaderboard'
end
