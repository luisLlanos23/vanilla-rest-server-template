resource "kubernetes_deployment_v1" "vanilla_server_template_deployment" {
  timeouts {
    create = "3m"
    update = "3m"
    delete = "3m"
  }
  metadata {
    name      = "vanilla-rest-server"
    namespace = "templates"
    labels = {
      app = "vanilla-rest-server"
    }
  }
  spec {
    revision_history_limit = 5
    selector {
      match_labels = {
        app = "vSERVER_PORT"
      }
    }
    template {
      metadata {
        name = "vanilla-rest-server"
        labels = {
          app = "vanilla-rest-server"
        }
      }
      spec {
        container {
          name              = "vanilla-rest-server"
          image             = "luisllanos/vanilla-rest-server-template:latest"
          image_pull_policy = "Always"

          env {
            name = "NODE_IP"
            value_from {
              field_ref {
                field_path = "status.hostIP"
              }
            }
          }
          env {
            name  = "DATABASE_HOST"
            value = "$(NODE_IP)"
          }
          env {
            name  = "DATABASE_PORT"
            value = 30000
          }
          env {
            name  = "DATABASE_PASS"
            value = var.env_vars.DATABASE_PASSWORD
          }
          env {
            name  = "RUN_MIGRATIONS"
            value = var.env_vars.RUN_MIGRATIONS
          }
          env {
            name  = "SECRET_TOKEN"
            value = var.env_vars.SECRET_TOKEN
          }
          env_from {
            config_map_ref {
              name = "vanilla-rest-server"
            }
          }
          resources {
            requests = {
              memory = "500Mi"
            }
          }
          port {
            container_port = 4000
          }
        }
      }
    }
  }
}