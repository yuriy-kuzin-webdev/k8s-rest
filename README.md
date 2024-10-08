# k8s-rest
## pre configuration ( kubectl connected remotely/local, accessible nfs-server )
- create service account
```bash
kubectl apply -f service-account.yaml
```
- create ClusterRoleBinding
```bash
kubectl apply -f clusterrolebinding.yaml
```
- create token
```bash
kubectl apply -f service-account-token.yaml
```
- retrieve token and save it
```bash
kubectl get secret automation-sa-token -n default -o jsonpath='{.data.token}' | base64 --decode
```
- export token
```bash
export KUBE_TOKEN=<token>
```
- bypass SSL
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
```
- export k8s host address
```bash
export KUBE_URL=https://<cluster ip>
```
- export nfs-server endpoint
```bash
export NFS_SERVER=<IP/DNS>
```
## configure storage class once
- storage class creation
```bash
ts-node src/deployStorageClass
```
## deployment
- deploy
```bash
ts-node src/deployEnvironment
```
