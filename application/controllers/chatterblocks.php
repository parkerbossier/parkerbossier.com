<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Chatterblocks extends CI_Controller
{

    public function index()
    {
        // Increase the memory
        ini_set('memory_limit', '200M');

        // Create the trie
        $eng_trie = new Trie();

        // Load the word list into the trie
        $word_list = file('http://www.sil.org/linguistics/wordlists/english/wordlist/wordsEn.txt', FILE_IGNORE_NEW_LINES);
        foreach ($word_list as $cur_word)
        {
            $eng_trie->add($cur_word);
        }

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

        var_dump($eng_trie->isMember('abaci'));
        var_dump($eng_trie->prefixSearch('abaci'));
        var_dump($eng_trie->isMember('abac'));
        var_dump($eng_trie->prefixSearch('abac'));
        var_dump($eng_trie->isMember('a'));
        var_dump($eng_trie->prefixSearch('a'));
        //var_dump(generate_words($block_array, array(), array()));
    }

    // Generates all possible words from the given set of blocks
    function generate_words($remaining_blocks, $prefixes, $words)
    {

        // Base case (no more blocks)
        if (count($remaining_blocks) == 0)
        {
            return $words;
        }

        // Initialize variables to hold the results.
        $resulting_prefixes = array();
        $resulting_words = array();

        // Loop through each block
        foreach ($remaining_blocks as $block_key => $cur_block)
        {

            // Recurse on each letter
            foreach ($cur_block as $cur_letter)
            {
                // Generate new prefixes
                foreach ($prefixes as $cur_prefix)
                {
                    if ($eng_trie->isMember($cur_prefix . $cur_letter))
                    {
                        
                    }
                }
                $new_prefixes;











                // Generate the combinations to recurse on
                if (count($combinations) == 0)
                {
                    // Don't add the letter if it's not a prefix.
                    if (!$eng_trie->prefixSearch($cur_letter))
                    {
                        return array();
                    } else
                    {
                        $combinations_to_pass = array($cur_letter);
                    }
                } else
                {
                    // Generate new combinations if they're valid
                    foreach ($combinations as $cur_combination)
                    {
                        if ($eng_trie->isMember($cur_combination))
                        {
                            $combinations_to_pass[] = $cur_combination;
                        }
                        $cur_combo_letter = $cur_combination . $cur_letter;
                        if ($eng_trie->prefixSearch($cur_combo_letter) || $eng_trie->isMember($cur_combo_letter))
                        {
                            $combinations_to_pass[] = $cur_combo_letter;
                        }
                    }
                }
            }
        }
    }

}

class Trie
{

    private $trie;

    public function __construct()
    {
        $trie = array('children' => array());
    }

    public function add($key, $value = null)
    {
        $trieLevel = & $this->getTrieForKey($key, true);
        $trieLevel['value'] = $value;
    }

    public function isMember($key)
    {
        $trieLevel = $this->getTrieForKey($key);
        if ($trieLevel != false && array_key_exists('value', $trieLevel))
        {
            return true;
        }
        return false;
    }

    public function prefixSearch($prefix)
    {
        $trieLevel = $this->getTrieForKey($prefix);
        if ($trieLevel == NULL or $trieLevel['children'] == NULL)
        {
            return false;
        } else
        {
            return true;
        }
    }

    private function& getTrieForKey($key, $create = false)
    {
        $trieLevel = & $this->trie;
        for ($i = 0; $i < strlen($key); $i++)
        {
            $character = $key[$i];
            if (!isset($trieLevel['children'][$character]))
            {
                if ($create)
                {
                    $trieLevel['children'][$character] =
                            array('children' => array());
                } else
                {
                    return NULL;
                }
            }
            $trieLevel = & $trieLevel['children'][$character];
        }

        return $trieLevel;
    }

}