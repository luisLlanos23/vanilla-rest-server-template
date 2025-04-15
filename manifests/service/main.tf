resource "kubernetes_service_v1" "vanilla_server_template_service" {
  metadata {
    name      = "vanilla-rest-server"
    namespace = "templates"
  }
  spec {
    selector = {
      app = "vanilla-rest-server"
    }
    type             = "NodePort"
    session_affinity = "None"
    session_affinity_config {
      client_ip {
        timeout_seconds = 10800
      }
    }
    port {
      port      = 4000
      node_port = 30040
      protocol  = "TCP"
    }
  }
}