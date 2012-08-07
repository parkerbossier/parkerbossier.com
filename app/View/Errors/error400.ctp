<?php
/**
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright	 Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link		  http://cakephp.org CakePHP(tm) Project
 * @package	   Cake.View.Errors
 * @since		 CakePHP(tm) v 0.10.0.1076
 * @license	   MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
?>
<div class="container">
	<div class="row">
		<h2 style="text-align: center;">Error 2^8 + 2^7 + 2^4 + 2^2: <?php echo $name; ?></h2>
	</div>

	<div class="row">
		<div class="span4 offset4" style="text-align: center;">
			The requested address <strong><?php echo $url; ?></strong> was not found on this server.
			<br/>
			<br/>
			If you believe you're seeing this page in error, please contact me by clicking on the <strong>Contact</strong> link above.
		</div>
	</div>

	<div class="row">
		<?php
		if (Configure::read('debug') > 0):
			echo $this->element('exception_stack_trace');
		endif;
		?>
	</div>
</div>
