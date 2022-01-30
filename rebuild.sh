#!/bin/zsh

kubectl delete deployment comments-depl
kubectl delete deployment event-bus-depl
kubectl delete deployment moderation-depl
kubectl delete deployment posts-depl
kubectl delete deployment query-depl

cd comments
docker build -t allexraduid/node_js_microservices_blog_comments .
docker push allexraduid/node_js_microservices_blog_comments
cd ..
cd event-bus
docker build -t allexraduid/node_js_microservices_blog_event_bus .
docker push allexraduid/node_js_microservices_blog_event_bus
cd ..
cd moderation
docker build -t allexraduid/node_js_microservices_blog_moderation .
docker push allexraduid/node_js_microservices_blog_moderation
cd ..
cd posts
docker build -t allexraduid/node_js_microservices_blog_posts .
docker push allexraduid/node_js_microservices_blog_posts
cd ..
cd query
docker build -t allexraduid/node_js_microservices_blog_query .
docker push allexraduid/node_js_microservices_blog_query
cd ..
cd infra/k8s
kubectl apply -f .
kubectl get pods



