document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('password-strength');

    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
        const strength = getPasswordStrength(password);
        updateStrengthMeter(strength);
    });

    function getPasswordStrength(password) {
        let strength = 0;
        let aproved = false;

        if (password.length >= 8) aproved = true; // Length
        if (/[A-Z]/.test(password)) strength++; // Uppercase letter
        if (/[a-z]/.test(password)) strength++; // Lowercase letter
        if (/[0-9]/.test(password)) strength++; // Number
        if (/[\W_]/.test(password)) strength++; // Special character

        // Add a fifth level for very strong passwords
        if (password.length >= 12) strength++; // Additional length for very strong

        return aproved ? Math.min(strength, 5) : Math.min(strength, 2); // Ensure strength does not exceed 5 if approved, or 2 if not
    }

    function updateStrengthMeter(strength) {
        const colors = ['#ff4d4d', '#ff4d4d', '#ff9900', '#00cc00', '#00b300','#00b300']; // Red, Orange, Light Green, Green, More Vibrant Green
        const strengthBar = document.createElement('span');

        // Clear previous strength bar
        passwordStrength.innerHTML = '';

        // Set width and color based on strength
        strengthBar.style.width = (strength * 20) + '%'; // 0-100% (5 levels, each 20%)
        strengthBar.style.backgroundColor = colors[strength];

        passwordStrength.appendChild(strengthBar);
    }

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
});