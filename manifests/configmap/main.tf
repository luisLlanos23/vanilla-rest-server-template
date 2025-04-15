resource "kubernetes_config_map_v1" "vanilla_server_template_config_map" {
  metadata {
    name      = "vanilla-rest-server"
    namespace = "templates"
  }

  data = {
    DATABASE_NAME   = "${var.env_vars.DATABASE_NAME}"
    DATABASE_USER   = "${var.env_vars.DATABASE_USER}"
    DATABASE_SCHEMA = "${var.env_vars.DATABASE_SCHEMA}"
    SERVER_PORT     = 4000
  }
}