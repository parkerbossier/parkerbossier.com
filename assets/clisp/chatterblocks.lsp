#|
(load "C:\\Users\\Bojenator\\Documents\\Web Development\\parkerbossier.com\\assets\\clisp\\chatterblocks.lsp")
|#

; bock definitions

(setf blocks
    '((m h u v o n)
    (p e s l)
    (y n m r l s)
    (e b t v o f)
    (y o t e d r)
    (a s q t g c)
    (m a d h w e)
    (p g a e o j)
    (z a n l o t)
    (t w c z i)
    (e n k c l r)
    (d r s g f k)))

(defun generate_combinations (remaining_blocks combinations)
"recursively generates all <<words>> formable with the given list of blocks"

    (cond
        ; no blocks left. return the list of combinations
        ((null remaining_blocks) combinations)

        ; not done yet. recurse. start with allocating a variable to keep the loop results
        (T (let ((resulting_combinations NIL))

            ; loop through each block
            (loop for cur_block in remaining_blocks do

                ; recurse on each letter
                (loop for cur_letter in cur_block do

                    ; update the current level combination list
                    (setf resulting_combinations

                        ; append the existing list to the recursive result
                        (remove-duplicates (append
                            resulting_combinations

                            ; recursive call
                            (generate_combinations

                                    ; blocks other than the current one
                                    (remove cur_block remaining_blocks)

                                    ; the current letter if no combinations exist.
                                    (if (null combinations)
                                        (list (list cur_letter))

                                        ; the current combinations plus the current letter appended to each combination
                                        (append
                                            (mapcar (lambda (i) (append i (list cur_letter))) combinations)
                                            combinations)))) :test 'equal))))

            ; let return
            resulting_combinations))))

(defun test ()
    (let* ((foo (generate_combinations blocks NIL))
            (bar (remove-duplicates foo :test 'equal)))
        (print (length foo))
        (length bar)))