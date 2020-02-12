<?php
/* Заявки
------------------------------------------------------- */
if($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
	include_once '../include/config.inc.php';
	include_once '../include/functions.php';
	header("Cache-Control: no-store"); //повна заборона кешування
	header("Content-Type: text/html; charset=utf-8");
	
	$name = trim($_POST['name']);
	$tel = trim($_POST['tel']);
	$city = trim($_POST['city']);
	
	if (empty($tel)) {
		$error['name'] = 'error';
		$error['error'] = 'Заповніть номер телефону';
		exit(json_encode($error));
	}
	
	$body1 = '<h2>'. $arr_themes[$action] .' №'. $id .'</h2>
	<table cellspacing="0" border="1px">
		<tr>
			<td style="padding: 10px 15px; font-size: 14px;">Ім\'я:</td>
			<td style="padding: 10px 15px; font-size: 14px;">'. $name .'</td>
		</tr>

		<tr>
			<td style="padding: 10px 15px; font-size: 14px;">Телефон:</td>
			<td style="padding: 10px 15px; font-size: 14px;">'. $tel .'</td>
		</tr>

		<tr>
			<td style="padding: 10px 15px; font-size: 14px;">Місто:</td>
			<td style="padding: 10px 15px; font-size: 14px;">'. $city .'</td>
		</tr>
	</table>';

	$mail = new mMail($config['email_from']); //створюємо екземпляр класу
	$mail->setFromName($config['name']); //встановлюємо ім'я в зворотній адресі
	//шаблон листа адміністратору
	$message1 = templateMail($body1);
	//відправляємо лист адміністратору
	$mail->send($config['email_admin'], 'Нова заявка', $message1);

	$error["name"] = "success";
	exit(json_encode($error));
}