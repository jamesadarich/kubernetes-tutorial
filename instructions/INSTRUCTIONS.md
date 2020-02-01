# AKS easy as ABC

Everyone is talking about Kubernetes and now Microsoft have released their offering (AKS - Azure Kubernetes Service) let's give it a whirl!

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

If you want to switch it simply find the subscription you need via

```cli
az account list
```

Then select it using

```cli
az account set -s <SUBSCRIPTION_ID>
```

## Register some providers

AKS requires a few extra bits of azure goodness simply run these commands to make sure you've got all the required dependencies.

```cli
az provider register -n Microsoft.Network
az provider register -n Microsoft.Storage
az provider register -n Microsoft.Compute
az provider register -n Microsoft.ContainerService
```

## Let's get creative

Now we're ready to set up an AKS instance, first we need a resource group...

```cli
az group create --name <RG-NAME> --location <RG-LOCATION>
```

... then we can create the instance itself. It's important to note that as of writing this article it is not possible to change vm size so please make sure you set it to something that is going to work for your application

```cli
az aks create --resource-group <RG_NAME> --node-vm-size <VM-SIZE> --name <CLUSTER_NAME> --node-count <NODE_COUNT> --generate-ssh-keys
```

## Install some helpful tools

Next we need some tools to help us set up our application.

```cli
az aks install-cli
```

The above command will set up 

### kubectl

### helm


## Time to get Kubery

Now we've got all are tools in place we can get to work, first we'll need to get some credentials so we can connect to our AKS instance

```cli
az aks get-credentials --resource-group <RG_NAME> --name <CLUSTER_NAME>
```

then we need to initialise helm on our AKS instance [WHAT IS GOING ON HERE WITH ACCOUNT ETC.]

```cli
helm init (--upgrade --service-account default)
```

finally we update helm's repo so we can use some awesome up to date charts

```cli
helm repo update
```

## Ingress. Service, Deployment

```cli
kubectl create -f infrastructure/kubernetes.yaml
```

## TLS (convert to cert-manager)

```cli
helm install stable/nginx-ingress --namespace kube-system --set rbac.create=false
```

Grab the IP

```cli
kubectl get service -l app=nginx-ingress --namespace kube-system
```

```cli
az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '<IP_ADDRESS>')].[id]" --output tsv
```

```cli
az network public-ip update --ids <IP_ID> --dns-name <DNS_PREFIX>
```

## Version the API

## Tidying it up

```cli
az group delete --name <RESOURCE_GROUP> --yes --no-wait
```