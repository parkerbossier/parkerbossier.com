<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Chatterblocks extends CI_Controller {

    public function index() {
        $this->load->database();

        // Block information
        $block_array = array(
            array('m', 'h', 'u', 'v', 'o', 'n'),
            array('p', 'e', 's', 'l'),
            array('y', 'n', 'm', 'r', 'l', 's'),
            array('e', 'b', 't', 'v', 'o', 'f'),
            array('y', 'o', 't', 'e', 'd', 'r'),
            array('a', 's', 'q', 't', 'g', 'c'),
            array('m', 'a', 'd', 'h', 'w', 'e'),
            array('p', 'g', 'a', 'e', 'o', 'j'),
            array('z', 'a', 'n', 'l', 'o', 't'),
            array('t', 'w', 'c', 'z', 'i'),
            array('e', 'n', 'k', 'c', 'l', 'r'),
            array('d', 'r', 's', 'g', 'f', 'k')
        );

        $block_array = array(
            array('d', 'f', 'r'),
            array('e', 'a', 'o'),
            array('b', 'c', 'd')
        );

        $foo = $this->_generate_words($block_array, array(), array());

        foreach ($foo as $bar) {
            echo $bar . '<br/>';
        }
    }

    private function _prefix_search($prefix) {
        $query_string = "SELECT * FROM english_words WHERE word LIKE '$prefix%%' AND word <> '$prefix'";
        $result = $this->db->query($query_string);

        return $result->num_rows() > 0;
    }

    private function _word_search($word) {
        $query_string = "SELECT * FROM english_words WHERE word = '$word'";
        $result = $this->db->query($query_string);

        return $result->num_rows() > 0;
    }

    // Generates all possible words from the given set of blocks
    private function _generate_words($remaining_blocks, $prefixes, $words) {

        // Base case (no more blocks)
        if (count($remaining_blocks) == 0) {
            return $words;
        }

        // Initialize variables to hold the results.
        $resulting_prefixes = array();
        $resulting_words = array();

        // Loop through each block
        foreach ($remaining_blocks as $block_key => $cur_block) {

            // Generate the remaining blocks list
            $new_blocks = $remaining_blocks;
            unset($new_blocks[$block_key]);

            // Recurse on each letter
            foreach ($cur_block as $cur_letter) {

                // If both lists are empty, generate new prefixes/words
                if (count($prefixes) == 0 && count($words) == 0) {
                    $new_words = array();
                    if ($this->_word_search($cur_letter)) {
                        $new_words[] = $cur_letter;
                    }

                    $new_prefixes = array();
                    if ($this->_prefix_search($cur_letter)) {
                        $new_prefixes[] = $cur_letter;
                    }


                    $recursive_result = $this->_generate_words($new_blocks, $new_prefixes, $new_words);
                    $resulting_words = array_merge($resulting_words, $recursive_result);
                }

                // Otherwise, add words/prefixes based on the existing ones
                else {
                    foreach ($prefixes as $cur_prefix) {
                        //$new_prefixes[] = $cur_prefix;

                        $new_words = array();
                        if ($this->_word_search($cur_prefix . $cur_letter)) {
                            $new_words[] = $cur_prefix . $cur_letter;
                        }

                        $new_prefixes = array();
                        if ($this->_prefix_search($cur_prefix . $cur_letter)) {
                            $new_prefixes[] = $cur_prefix . $cur_letter;
                        }

                        $recursive_result = $this->_generate_words($new_blocks, $new_prefixes, $new_words);
                        echo 'resulting pre: ';
                        var_dump($resulting_words);
                        $resulting_words = array_merge($resulting_words, $recursive_result);
                        echo 'resulting post: ';
                        var_dump($resulting_words);
                    }
                }
            }
        }

        return $resulting_words;
    }

}