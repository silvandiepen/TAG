<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>Insert Codes</title>
	<link href="../css/app.css" type="text/css" rel="stylesheet" />

</head>
<body>
	
	<div class="step_holder">
		<div class="step red active">
			
				<div class="row">
					<div class="mini-12 medium-6">
						<h2>Voer alle codes in.</h2>
					</div>
				</div>
		
			<?php 
				
				if($_SERVER['REQUEST_METHOD'] == 'POST') {
					$codes = preg_replace("/[\r\n]+/", "", $_POST['codes']);
					$codes = str_split(str_replace(' ','',$codes),5);
				//	$list = explode('', $_POST['codes']);
/*
					echo '<pre>';
					print_r($codes);
					echo '</pre>';
*/
					$insert = 'INSERT INTO kid (code) VALUES';
					
					$i = 0;
					foreach($codes as $key => $value){
						$i++;
						$insert .= '("'.$value.'"),'; 		
					}
					
					echo $i.' codes <br />';
					echo $insert; 
					
				}
			
			?>
		
			<div class="row">

				<div class="mini-12 medium-4">
					
					<form method="post" action="#">
						
						<div class="row">
							<div class="mini-12">
								<label>characters</label><br />			
								<input type="text" name="characters" value="BCDFGHJKLMNPQRSTVWXYZ23456789" />
							</div>
						</div>						
						
						<div class="row">
							<div class="mini-12">
								<label>codelength</label><br />			
								<input type="text" name="codelength" />
							</div>
						</div>						
						
						<div class="row">
							<div class="mini-12">
								<label>amount of codes</label><br />
								<input type="text" name="amount" /> 
							</div>
						</div>			
											
					</form>
					
				</div>
		
				<div class="mini-12 medium-6">
						
				<form method="post" action="#">
						
					<div class="row">
						<div class="mini-12">
							<label>Codes</label><br />				
							<textarea name="codes"></textarea>
						</div>
					</div>
					
					<div class="row">
						<div class="mini-12">
							<label></label>				
							<input type="submit" class="button" value="toevoegen" />	
						</div>
					</div>
					
				</form>
		
			</div>
			
			</div>
		
	</div>
</div>
	
</body>
</html>