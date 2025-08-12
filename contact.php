<?php
// Database connection
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "portfolio_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form data
$firstName = $_POST['first_name'] ?? '';
$lastName  = $_POST['last_name'] ?? '';
$email     = $_POST['email'] ?? '';
$message   = $_POST['message'] ?? '';

// Save to database
$sql = "INSERT INTO contact_messages (first_name, last_name, email, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $firstName, $lastName, $email, $message);

if ($stmt->execute()) {
    // Include PHPMailer
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';
    require 'phpmailer/src/Exception.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer();

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'aryalavih@gmail.com'; // apna Gmail ID
        $mail->Password   = 'cuuy wjqc gcxa bcer'; // Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Email settings
        $mail->setFrom('aryalavih@gmail.com', 'Portfolio Website');
        $mail->addAddress('aryalavih@gmail.com'); // jahan receive karna hai
        $mail->Subject = 'New Contact Form Message';
        $mail->Body    = "Name: $firstName $lastName\nEmail: $email\nMessage:\n$message";

        if ($mail->send()) {
            echo "Message sent successfully and email notification delivered!";
        } else {
            echo "Message saved in DB, but email failed: " . $mail->ErrorInfo;
        }

    } catch (Exception $e) {
        echo "Message saved in DB, but email could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

} else {
    echo "Database error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
