CorbinSanDiego::Application.routes.draw do

  get '/' => 'welcome#index'

  get '/leaderboard' => 'leaderboard#index'
  post '/leaderboard' => 'leaderboard#add'

end
