<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// $onGae is true on production.
if (isset($_SERVER['GAE_ENV'])) {
    $onGae = true;
} else {
    $onGae = false;
}

// Cache settings
// Disable cache for now, as this does not work on App Engine for PHP 7.2
define('WP_CACHE', false);

// Disable pseudo cron behavior
define('DISABLE_WP_CRON', true);

// Determine HTTP or HTTPS, then set WP_SITEURL and WP_HOME
if ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443)) {
    $protocol_to_use = 'https://';
} else {
    $protocol_to_use = 'http://';
}
if (isset($_SERVER['HTTP_HOST'])) {
    define('HTTP_HOST', $_SERVER['HTTP_HOST']);
} else {
    define('HTTP_HOST', 'localhost');
}
define('WP_SITEURL', $protocol_to_use . HTTP_HOST);
define('WP_HOME', $protocol_to_use . HTTP_HOST);

// ** MySQL settings - You can get this info from your web host ** //
if ($onGae) {
    /** The name of the Cloud SQL database for WordPress */
    define('DB_NAME', 'wordpress');
    /** Production login info */
    define('DB_HOST', ':/cloudsql/wordpress-angular-universal:us-central:wordpress');
    define('DB_USER', 'wordpress');
    define('DB_PASSWORD', 'examplepass');
} else {
    /** The name of the local database for WordPress */
    define('DB_NAME', 'exampledb');
    /** Local environment MySQL login info */
    define('DB_HOST', 'db');
    define('DB_USER', 'exampleuser');
    define('DB_PASSWORD', 'examplepass');
}

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'eLobbZ1kRTaWiFNXgc5lJVPkn9nqik7WgWhDz6kd2YuRHczCYKVIAObN697i85wsvwdjKfxB0jXt/VMm');
define('SECURE_AUTH_KEY',  '/CdUKczS5Y63ihR45En6CXotnaNxEbDdcXQlITkV8KFs61K2IKU3jpZ7mONhRyjwMNMHzkxXvzwIPhoM');
define('LOGGED_IN_KEY',    'cwQ9hZ43PBgBqAVxoFYhIMmKeVPRoK4D9Fxk4++u3z+21NluUn91pJueAQ8NvzlkAf1IXKJjMTj4jOf9');
define('NONCE_KEY',        '6GSfLOizMYS0DYvSPpfMEodf+L31OYGB9JK0RECIkHJXNgqJEcY8FpLEughdRpWaN9nyNx6uSc4ia0uw');
define('AUTH_SALT',        '/pJSIN8FgcbT9ViPD06TXetMcfP1jF+mFx59fhk3PRFx35uCr/vh3v3w9wIBCMY9GRqhbMFRafVqGFPb');
define('SECURE_AUTH_SALT', 'KEgAtn9t7xakg7xHjx+8OMLwl1ZHHtjjvhEKH2zPNazT5316SNX74NcwiPuLQ7ATBEVWCVJOEs7UPza2');
define('LOGGED_IN_SALT',   'vkauMU2SH2w+Fet1uKt2BdyKC93RkiPErPb9TrA9oyEJAd7/gCtgccFdLXXJk72z2uvS9Q4pHqORIWEw');
define('NONCE_SALT',       'bWa3EBhnFcKcqlUFucXiRItA1q24t9Rc17AacD/6ZwRhPdxU78zlfRBGrmwbZhulv6X4fyeq6LC1dLc0');

/**#@-*/
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', !$onGae);

/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
    define('ABSPATH', dirname(__FILE__) . '/wordpress/');
}

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
