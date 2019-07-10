module.exports = {
  GET: "column_get",
  PARAMETER: {
    GET: 'column_single_get',
    PATCH: "column_single_settings",
    avatar: {
      GET: "column_single_avatar_get"
    },
    banner: {
      GET: "column_single_banner_get"
    },
    category: {
      GET: "column_single_settings_post",
      POST: "column_single_settings_post",
      PATCH: "column_single_settings_post",
      PARAMETER: {
        DELETE: "column_single_settings_post",
        PATCH: "column_single_settings_post"
      }
    },
    post: {
      POST: "column_single_settings_post",
      GET: "column_single_settings_post"
    },
    subscribe: {
      POST: "column_single_subscribe"
    },
    settings: {
      GET: "column_single_settings",
      post: {
        GET: "column_single_settings_post",
        POST: "column_single_settings_post",
        add: {
          GET: "column_single_settings_post",
          POST: "column_single_settings_post"
        }
      },
      contribute: {
        GET: "column_single_settings_contribute",
        POST: "column_single_settings_contribute"
      },
      category: {
        GET: "column_single_settings_post",
        PARAMETER: {
          GET: "column_single_settings_post"
        }
      },
      transfer: {
        GET: "column_single_settings_transfer",
        POST: "column_single_settings_transfer"
      },
      close: {
        GET: "column_single_settings_close",
        POST: "column_single_settings_close"
      }
    },
    contribute: {
      GET: "column_single_contribute",
      POST: "column_single_contribute"
    },
    status: {
      GET: "column_single_status"
    }
  }
};