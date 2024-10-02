# k8s-rest
## pre configuration
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
