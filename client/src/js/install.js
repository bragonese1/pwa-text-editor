const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

let deferredPrompt; // Variable to store the install event

// Event handler for `beforeinstallprompt`
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();
  
  // Save the event to trigger it later
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

// Click event handler for the install button
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Clear the deferred prompt variable, it can only be used once
    deferredPrompt = null;

    // Hide the install button after installation
    butInstall.style.display = 'none';
  }
});

// Event handler for `appinstalled`
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed successfully!', event);
});
