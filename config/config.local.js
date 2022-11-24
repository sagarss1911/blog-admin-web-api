/**
 * Global configuration for running server will reside here
 * ALL DB configuration, S3, and other apis calling url
 * along with their host name and port should reside here.
 *
 * This app server will get started from server/app.json file when required parameters can be
 * altered based on environment.
 */
var config = {
  /**
   * server configuration
   */
  server: {
    port: 3000,
    networkCallTimeout: 30000,
  },
  /**
   * DB configuration
   */

  //  all_south_flooring: {
  //   database_name: 'all_south_flooring',
  //   host: 'mongodb://localhost',
  //   port: 27017,
  //  },
  all_south_flooring: {
    database_name: 'maptia',
    host: 'mongodb://localhost',
    port: 27017,
  },
  base_url: "http://localhost:5000",
  api_key: "12345",
  upload_folder: "uploads",
  upload_entities: {
    blogs_images_folder: "/blogs_images/",
    subscriber_image_folder: "/subscriber_image/",
    slider_image_folder: "/slider_image/",
    logo_slider_image_folder: "/logo_slider_image/",
    blogs_images_folder: "/blogs_image/",
    place_image_folder: "/place_image/",
    aboutUs_image_folder: "/aboutUs_image/",
    JourneyIcon_image_folder: "/journeyIcon_image/"
  },
  SENDGRID_API_KEY: "",
  from_email: "",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  user: '',
  pass: ''
};

module.exports = config;
