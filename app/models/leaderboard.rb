class Leaderboard < ActiveRecord::Base
  has_many :scores
  has_many :names

end