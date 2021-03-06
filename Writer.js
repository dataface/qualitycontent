module.exports = {
    
    // This function was shamelessly ripped from the Internet in order to get interesting results fast
    // There will be better efforts to come...
    markovize: function (titles) {
        // input: list
        // output: string

        var terminals = {},
            startwords = [],
            wordstats = {};

        for (var i = 0; i < titles.length; i++) {
            var words = titles[i].split(' ');
            terminals[words[words.length-1]] = true;
            startwords.push(words[0]);
            for (var j = 0; j < words.length - 1; j++) {
                if (wordstats.hasOwnProperty(words[j])) {
                    wordstats[words[j]].push(words[j+1]);
                } else {
                    wordstats[words[j]] = [words[j+1]];
                }
            }
        }

        var choice = function (a) {
            var i = Math.floor(a.length * Math.random());
            return a[i];
        };

        var make_title = function (min_length) {
            word = choice(startwords);
            var title = [word];
            while (wordstats.hasOwnProperty(word)) {
                var next_words = wordstats[word];
                var word = choice(next_words);
                title.push(word);
                if (title.length >= min_length && terminals.hasOwnProperty(word)) break;
            }
            if (title.length < min_length) {
                return make_title(min_length);
            }
            return title.join(' ');
        };

        return make_title(10);
    }
};
