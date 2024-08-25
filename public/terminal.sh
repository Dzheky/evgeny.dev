#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install Zsh if not already installed
if ! command_exists zsh; then
    echo "Installing Zsh..."
    if command_exists apt-get; then
        sudo apt-get update && sudo apt-get install -y zsh
    elif command_exists yum; then
        sudo yum -y install zsh
    elif command_exists brew; then
        brew install zsh
    else
        echo "Could not install Zsh. Please install it manually."
        exit 1
    fi
fi

# Install Oh My Zsh
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    echo "Installing Oh My Zsh..."
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
fi

# Install popular Oh My Zsh plugins
plugins=(
    "zsh-autosuggestions"
    "zsh-syntax-highlighting"
    "autojump"
)

for plugin in "${plugins[@]}"; do
    if [ ! -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/$plugin" ]; then
        echo "Installing $plugin..."
        case $plugin in
            "zsh-autosuggestions")
                git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
                ;;
            "zsh-syntax-highlighting")
                git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
                ;;
            "autojump")
                if command_exists apt-get; then
                    sudo apt-get install -y autojump
                elif command_exists yum; then
                    sudo yum -y install autojump
                elif command_exists brew; then
                    brew install autojump
                else
                    echo "Could not install autojump. Please install it manually."
                fi
                ;;
        esac
    fi
done

# Update .zshrc to include the new plugins
sed -i.bak 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting autojump)/' ~/.zshrc

echo "Installation complete! Please restart your terminal or run 'source ~/.zshrc' to apply changes."
