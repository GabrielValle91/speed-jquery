# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_17_224001) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.string "name"
    t.string "qb_name"
    t.string "billing_address1"
    t.string "billing_address2"
    t.string "billing_city"
    t.string "billing_state"
    t.string "billing_zip"
    t.string "billing_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "net_terms"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone_number"
    t.bigint "client_id"
    t.index ["client_id"], name: "index_contacts_on_client_id"
  end

  create_table "drivers", force: :cascade do |t|
    t.string "name"
    t.string "employment_type"
    t.string "license"
    t.string "default_vehicle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "location_notes", force: :cascade do |t|
    t.bigint "location_id"
    t.string "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_location_notes_on_location_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "company_name"
    t.string "address1"
    t.string "address2"
    t.string "city"
    t.string "state"
    t.string "zip"
  end

  create_table "office_clients", force: :cascade do |t|
    t.bigint "office_id"
    t.bigint "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_office_clients_on_client_id"
    t.index ["office_id"], name: "index_office_clients_on_office_id"
  end

  create_table "office_drivers", force: :cascade do |t|
    t.bigint "office_id"
    t.bigint "driver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["driver_id"], name: "index_office_drivers_on_driver_id"
    t.index ["office_id"], name: "index_office_drivers_on_office_id"
  end

  create_table "office_trailers", force: :cascade do |t|
    t.bigint "office_id"
    t.bigint "trailer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["office_id"], name: "index_office_trailers_on_office_id"
    t.index ["trailer_id"], name: "index_office_trailers_on_trailer_id"
  end

  create_table "office_users", force: :cascade do |t|
    t.bigint "office_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["office_id"], name: "index_office_users_on_office_id"
    t.index ["user_id"], name: "index_office_users_on_user_id"
  end

  create_table "office_vehicles", force: :cascade do |t|
    t.bigint "office_id"
    t.bigint "vehicle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["office_id"], name: "index_office_vehicles_on_office_id"
    t.index ["vehicle_id"], name: "index_office_vehicles_on_vehicle_id"
  end

  create_table "offices", force: :cascade do |t|
    t.string "name"
    t.string "address1"
    t.string "address2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipment_charges", force: :cascade do |t|
    t.bigint "shipment_id"
    t.bigint "driver_id"
    t.decimal "amount", precision: 10, scale: 2
    t.date "charge_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "team_id"
    t.index ["driver_id"], name: "index_shipment_charges_on_driver_id"
    t.index ["shipment_id"], name: "index_shipment_charges_on_shipment_id"
  end

  create_table "shipment_costs", force: :cascade do |t|
    t.bigint "shipment_id"
    t.bigint "driver_id"
    t.decimal "amount", precision: 10, scale: 2
    t.date "charge_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "team_id"
    t.index ["driver_id"], name: "index_shipment_costs_on_driver_id"
    t.index ["shipment_id"], name: "index_shipment_costs_on_shipment_id"
  end

  create_table "shipment_invoices", force: :cascade do |t|
    t.bigint "shipment_id"
    t.string "charge_type"
    t.decimal "quantity", precision: 5, scale: 2
    t.decimal "revenue", precision: 10, scale: 2
    t.boolean "exported"
    t.bigint "team_id_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shipment_id"], name: "index_shipment_invoices_on_shipment_id"
    t.index ["team_id_id"], name: "index_shipment_invoices_on_team_id_id"
  end

  create_table "shipment_stop_accessorials", force: :cascade do |t|
    t.bigint "shipment_stop_id"
    t.string "accessorial_type"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shipment_stop_id"], name: "index_shipment_stop_accessorials_on_shipment_stop_id"
  end

  create_table "shipment_stop_items", force: :cascade do |t|
    t.bigint "shipment_stop_id"
    t.string "item_type"
    t.integer "quantity"
    t.integer "weight"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shipment_stop_id"], name: "index_shipment_stop_items_on_shipment_stop_id"
  end

  create_table "shipment_stops", force: :cascade do |t|
    t.bigint "location_id"
    t.bigint "driver_id"
    t.bigint "office_id"
    t.bigint "shipment_id"
    t.integer "stop_number"
    t.date "stop_start"
    t.date "stop_end"
    t.string "stop_status"
    t.date "stop_arrival"
    t.date "stop_departure"
    t.text "stop_notes"
    t.bigint "vehicle_id"
    t.bigint "trailer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "contact_id"
    t.time "stop_start_time"
    t.time "stop_end_time"
    t.time "stop_arrival_time"
    t.time "stop_departure_time"
    t.index ["contact_id"], name: "index_shipment_stops_on_contact_id"
    t.index ["driver_id"], name: "index_shipment_stops_on_driver_id"
    t.index ["location_id"], name: "index_shipment_stops_on_location_id"
    t.index ["office_id"], name: "index_shipment_stops_on_office_id"
    t.index ["shipment_id"], name: "index_shipment_stops_on_shipment_id"
    t.index ["trailer_id"], name: "index_shipment_stops_on_trailer_id"
    t.index ["vehicle_id"], name: "index_shipment_stops_on_vehicle_id"
  end

  create_table "shipment_tariffs", force: :cascade do |t|
    t.bigint "shipment_id"
    t.bigint "tariff_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shipment_id"], name: "index_shipment_tariffs_on_shipment_id"
    t.index ["tariff_id"], name: "index_shipment_tariffs_on_tariff_id"
  end

  create_table "shipments", force: :cascade do |t|
    t.bigint "client_id"
    t.string "reference"
    t.date "invoice_date"
    t.string "shipment_status", default: "Open"
    t.text "dispatch_notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "office_id"
    t.index ["client_id"], name: "index_shipments_on_client_id"
  end

  create_table "tariffs", force: :cascade do |t|
    t.bigint "client_id"
    t.string "name"
    t.decimal "rate", precision: 10, scale: 2
    t.decimal "min", precision: 10, scale: 2
    t.decimal "max", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_tariffs_on_client_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "office_id"
  end

  create_table "trailer_rentals", force: :cascade do |t|
    t.bigint "trailer_id"
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "office_id"
    t.index ["office_id"], name: "index_trailer_rentals_on_office_id"
    t.index ["trailer_id"], name: "index_trailer_rentals_on_trailer_id"
  end

  create_table "trailers", force: :cascade do |t|
    t.string "trailer_number"
    t.string "trailer_owner"
    t.string "trailer_owner_number"
    t.string "trailer_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vehicle_rentals", force: :cascade do |t|
    t.bigint "vehicle_id"
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "office_id"
    t.index ["office_id"], name: "index_vehicle_rentals_on_office_id"
    t.index ["vehicle_id"], name: "index_vehicle_rentals_on_vehicle_id"
  end

  create_table "vehicles", force: :cascade do |t|
    t.string "vehicle_number"
    t.string "vehicle_owner"
    t.string "vehicle_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "shipment_stops", "contacts"
  add_foreign_key "trailer_rentals", "offices"
  add_foreign_key "vehicle_rentals", "offices"
end
