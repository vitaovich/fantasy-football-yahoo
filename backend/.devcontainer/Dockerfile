# IMAGE LINK: https://hub.docker.com/_/microsoft-azure-functions-dotnet-isolated
FROM mcr.microsoft.com/azure-functions/dotnet-isolated:4-dotnet-isolated6.0-core-tools
RUN apt-get update && sudo apt-get install -y gnupg software-properties-common jq


################################
# Install Terraform (https://developer.hashicorp.com/terraform/tutorials/docker-get-started/install-cli)
################################

# Install the HashiCorp GPG key.
RUN \
wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
tee /usr/share/keyrings/hashicorp-archive-keyring.gpg

# Verify the key's fingerprint.
RUN \
gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint

# Add the official HashiCorp repository to your system
RUN \
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
tee /etc/apt/sources.list.d/hashicorp.list

# Download the package information from HashiCorp.
RUN apt update

# Install Terraform from the new repository.
RUN apt-get install terraform

RUN curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok

# WORKDIR "backend"
# RUN dotnet restore
