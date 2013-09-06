class LeaderboardController < ApplicationController

  def index
    @scores = Leaderboard.all
  end

  def add
    score = Leaderboard.new(name: params[:name], score: params[:score])
    score.save
    redirect_to('/leaderboard')
  end

end