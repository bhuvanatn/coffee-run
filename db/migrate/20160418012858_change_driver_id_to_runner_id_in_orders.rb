class ChangeDriverIdToRunnerIdInOrders < ActiveRecord::Migration
  def change
    rename_column :orders, :driver_id, :runner_id
  end
end
