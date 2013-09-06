class Leaderboard < ActiveRecord::Base
  attr_accessible :score, :name

  has_many :scores
  has_many :names

end