docker build . -f src/v1/dockerfile -t jamesadarich/api-example:v1
# AKS easy as ABC

## Prerequisites

To keep things as simple as possible in this tutorial you should only need two things:

* An Azure Account
* The [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed

Be mindful to keep the Azure CLI up to date as AKS is currently in preview so you may not have the relevant options if you've installed it a while ago.

## Sign in to Azure CLI

Let's start easy, login to Azure via the CLI, the command is as below and will prompt you through the process.

```cli
az login
```

## Check your subscription

If you have multiple subscriptions you will need to ensure that you are working with the correct one. You can find out which subscription you are currently working with using the following command.

```cli
az account show
```

If you want to switch it simply find 

```cli
az account list
az account set -s <SUBSCRIPTION_ID>
```

## Register some providers

AKS is in preview so may need some first steps

```cli
az provider register -n Microsoft.Network
az provider register -n Microsoft.Storage
az provider register -n Microsoft.Compute
az provider register -n Microsoft.ContainerService
```

## Let's get creative

```cli
az group create --name <RG-NAME> --location <RG-LOCATION>
```

```cli
az aks create --resource-group <RG_NAME> --node-vm-size <VM-SIZE> --name <CLUSTER_NAME> --node-count <NODE_COUNT> --generate-ssh-keys
```

## Install some helpful tools

```cli
az aks install-cli
```

CHECK WHAT IS INSTALLED VIA THIS SEEMS LIKE NOT EVERYONE GOT THEM

### kubectl

### helm

## Time to get Kubery

```cli
az aks get-credentials --resource-group <RG_NAME> --name <CLUSTER_NAME>
```

# Ingress. Service, Deployment

```cli
kubectl create -f infrastructure/kubernetes.yaml
```

## TLS (convert to cert-manager)

helm init (--upgrade --service-account default)

helm repo update

helm install stable/nginx-ingress --namespace kube-system --set rbac.create=false --set rbac.createRole=false --set rbac.createClusterRole=false

Grab the IP

kubectl get service -l app=nginx-ingress --namespace kube-system

```cli
az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '<IP_ADDRESS>')].[resourceGroup, name]" --output tsv
```

az network public-ip update --resource-group <RESOURCE_GROUP> --name <IP_NAME> --dns-name <DNS_PREFIX>

# TLS

RBAC rules apply to this too! (--set rbac.create=false --set rbac.createRole=false --set rbac.createClusterRole=false)

helm install stable/cert-manager --set ingressShim.defaultIssuerName=letsencrypt-prod --set ingressShim.defaultIssuerKind=ClusterIssuer 

## Version the API

## Tidying it up

az group delete --name <RESOURCE_GROUP> --yes --no-wait
