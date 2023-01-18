## Environment
Needed values:
* global.node_env (default: production)
* global.jwt_secret
* global.jwt_issuer
* mongo_host
* mongo_port
* mongo_dbname

Optional values:
* global.namespaceOverride - Override the default namespace
* image - Docker image that will run inside the pod (default: "youryummy-ingredients-service:latest")
* mongo_pwd - Mongo database password
* mongo_user - Mongo database user
* mongo_proto - Mongo database protocol (default: mongodb)
* dev_node_port - (DEV ONLY) Port to which NodePort service will be binded (default: 30100)

## Setup development environment with HELM
1.- Prerequisites
* A kubernetes cluster
* Helm

2.- Create a values.yaml file containing:
```yaml
    global:
        node_env: development
        jwt_secret: mysecret 
        jwt_issuer: myissuer

    ingredients-service:
        mongo_host: host.docker.internal # Assuming the k8s is the one provided by Docker-Desktop
        mongo_port: 27017
        mongo_dbname: test-db
```

3.- Create the namespace
```sh
kubectl create namespace <namespace>
```

4.- Install the chart
```sh
helm install -f values.yaml youryummy ./ingredients-service/k8s/
```