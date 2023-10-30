## eshop frontends

Welcome to the eShop frontends project! This repository demonstrates the implementation of a robust e-commerce web application using the [eshop Api](https://github.com/saimankhatiwada/eshop.git).

## Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- [node 20](https://nodejs.org/en)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/)
- [Web Api](https://github.com/saimankhatiwada/eshop.git)

## Installing C#

### Linux (Ubuntu)

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install nodejs -y

```

## Getting Started

Follow these steps to set up and run the eshop frontends:

```
git clone https://github.com/saimankhatiwada/eshop-frontends.git
```

```
cd eshop-frontends
```

```
docker compose up
```

Access the CMS web application at `http://localhost:7150`
