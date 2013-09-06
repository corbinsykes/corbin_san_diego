class Leaderboard < ActiveRecord::Migration
  def change
    create_table :leaderboards do |t|
      t.string :name
      t.integer :score
    end
  end
end
