# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Enable Berkshelf support
  config.berkshelf.enabled = true

  # Define VM box to use
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"

  # Set share folder
  config.vm.synced_folder "./" , "/var/www/sophietracker/"

  # Use hostonly network with a static IP Address
  # and enable hostmanager
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.vm.define 'sophietracker' do |node|
    node.vm.hostname = 'sophietracker.local'
    node.vm.network :private_network, ip: '172.90.8.20'
    node.hostmanager.aliases = %w(www.sophietracker.local)
  end
  config.vm.provision :hostmanager

  # Enable and configure chef solo
  config.vm.provision :chef_solo do |chef|
    chef.add_recipe "app::packages"
    chef.add_recipe "app::web_server"
    chef.add_recipe "app::vhost"
    chef.add_recipe "memcached"
    chef.add_recipe "app::db"
    chef.add_recipe "postfix"
    chef.json = {
      :app => {
        # Project name
        :name           => "sophietracker",

        # Name of MySQL database that should be created
        :db_name        => "sophietracker",

        # Optional database dump to be imported when server is provisioned
        # If the file doesn't exist, it is just ignored
        :db_dump        => "/var/www/sophietracker/dump.sql",

        # Server name and alias(es) for Apache vhost
        :server_name    => "sophietracker.local",
        :server_aliases => "www.sophietracker.local",

        # Document root for Apache vhost
        :docroot        => "/var/www/sophietracker/public",

        # General packages
        :packages   => %w{ vim git screen curl },
        
        # PHP packages
        :php_packages   => %w{ php5-mysqlnd php5-curl php5-mcrypt php5-memcached php5-gd }
      },
      :mysql => {
        :server_root_password   => 'root',
        :server_repl_password   => 'root',
        :server_debian_password => 'root',
        :bind_address           => '172.90.8.20',
        :allow_remote_root      => true
      }
    }
  end
end