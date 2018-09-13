# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')
Rails.application.config.assets.precompile += %w( welcome.js )
Rails.application.config.assets.precompile += %w( dispatch.js )
Rails.application.config.assets.precompile += %w( shipments.js )
Rails.application.config.assets.precompile += %w( drivers.js )
Rails.application.config.assets.precompile += %w( clients.js )
Rails.application.config.assets.precompile += %w( locations.js )
Rails.application.config.assets.precompile += %w( vehicles.js )
Rails.application.config.assets.precompile += %w( trailers.js )
Rails.application.config.assets.precompile += %w( invoices.js )
Rails.application.config.assets.precompile += %w( offices.js )
Rails.application.config.assets.precompile += %w( users.js )

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
