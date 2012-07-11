// these can be global to avoid having to pass copies all the time
var matrix;
var speed;
var stop = false;
			
// replaceAt
String.prototype.replaceAt = function(index, replace_char) {
	return this.substr(0, index) + replace_char + this.substr(index+replace_char.length);
}

// DOM load
$(function() {
	// speed change events
	$('#iters_per_sec').keyup(function() {
		speed = 1000/$('#iters_per_sec').val();
	});
	
	// trigger the keyup function to pre-populate the speed
	$('#iters_per_sec').keyup();
				
	// run click handler
	$('#run').click(function() {
		var self = $(this);
		if (!self.hasClass('disabled')) {
			self.addClass('disabled');
			$('#stop').removeClass('disabled');
			stop = false;
		
			// get the matrix (global)
			matrix = matrix_from_transitions();
		
			// zero out the iterations
			$('#iterations').val('0');
		
			// run!
			setTimeout(function() {
				// note that the blank value is set here so thet the user can't modify the blank that the code sees during execution
				var tape = $('#tape').val();
				var head_loc = tape.indexOf('|');
				if (head_loc == -1) head_loc = 0;
				tape = tape.replace('|', '');
				run(matrix[0][0], head_loc, tape, $('#blank_symbol').val());
			}, speed);
		}
	});
	
	// stop click handler
	$('#stop').click(function() {
		stop = true;
	});
});
			
// does the actual computation
function run(state, head_loc, tape, blank) {
	// get the current tape value
	var cur_input = get_input(head_loc, tape, blank);
				
	// fetch the transition
	var transition = get_transition(state, cur_input);
				
	// done
	if (transition === false) {
		$('#run').removeClass('disabled');
		alert('Done. Finished in state ' + state + '.');
		return;
	}
				
	// update the tape
	tape = tape.replaceAt(head_loc, transition[3]);
	tape= tape.trim(blank);
	$('#tape').val(tape);
				
	// update the state
	state = transition[2];
				
	// move the head
	if (transition[4] == 'r' || transition[4] == 'R') {
		++head_loc;
	} else {
		--head_loc;
	}
				
	// increment iterations
	$('#iterations').val(Number($('#iterations').val()) + 1);
				
	// start again
	if (stop) {
		$('#run').removeClass('disabled');
	} else {
		setTimeout(function() {
			run(state, head_loc, tape, blank);
		}, speed);
	}
}

// custom trimfunction
String.prototype.trim = function(needle) {
	if (/\.|\$|\*/.test(needle)) needle = '\\' + needle;
	return this.replace(eval('/^' + needle + '+|' + needle + '+$/g'), '');
}


// determine if the tape index is blank
function get_input(index, tape, blank) {
	if (index < 0 || index >= tape.length) {
		return blank;
	} else {
		return tape[index];
	}
}
			
// returns a delta-matrix
function matrix_from_transitions() {
	// loop through the rows
	return $.map($('#transition_input').val().split('\n'), function(row, line_num) {
		row = row.trim();
		if (row[0] != '#') {
			// error
			if (!/^.+( )+.( )+.+( )+.( )+(l|r)$/i.test(row)) {
				alert('Malformed transition at line ' + line_num + '. Skipping...');
			}
		
			// process the row
			return [$.map(row.split(' '), function(item) {
				if (item != '') {
					return item;
				}
			})];
		}
	});
}
			
// returns the correct delta transition
function get_transition(state, input) {
	for (index in matrix) {
		if (matrix[index][0] == state && matrix[index][1] == input) {
			return matrix[index];
		}
	}
				
	return false;
}