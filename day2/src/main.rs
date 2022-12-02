use std::fs;

const WIN_POINTS: i32 = 6;
const DRAW_POINTS: i32 = 3;
const ROCK_POINTS: i32 = 1;
const PAPER_POINTS: i32 = 2;
const SCISSORS_POINTS: i32 = 3;

const OPONENT_ROCK: &str = "A";
const OPONENT_PAPER: &str = "B";
const OPONENT_SCISSORS: &str = "C";

const ME_ROCK: &str = "X";
const ME_PAPER: &str = "Y";
const ME_SCISSORS: &str = "Z";

const SHOULD_WIN: &str = "Z";
const SHOULD_LOSE: &str = "X";

fn main() {
    let result = puzzle_one();
    println!("Puzzle 1: {result}");
    let result = puzzle_two();
    println!("Puzzle 2: {result}");
}

struct Play {
    me: String,
    oponent: String,
}

fn puzzle_one() -> i32 {
    return get_plays_puzzle_one()
        .iter()
        .map(|play| calculate_score(play))
        .sum();
}

fn puzzle_two() -> i32 {
    return get_plays_puzzle_two()
        .iter()
        .map(|play| calculate_score(play))
        .sum();
}

fn read_file() -> String {
    fs::read_to_string("./input.txt").expect("Could not load the file")
}

fn calculate_score(play: &Play) -> i32 {
    let mut points = 0;

    if play.me == ME_ROCK && play.oponent == OPONENT_SCISSORS
        || play.me == ME_PAPER && play.oponent == OPONENT_ROCK
        || play.me == ME_SCISSORS && play.oponent == OPONENT_PAPER {
        points = points + WIN_POINTS;
    } else if play.me == ME_ROCK && play.oponent == OPONENT_PAPER
        || play.me == ME_PAPER && play.oponent == OPONENT_SCISSORS
        || play.me == ME_SCISSORS && play.oponent == OPONENT_ROCK {
        points = points + 0;
    } else {
        points = points + DRAW_POINTS;
    }

    if play.me == ME_ROCK {
        points = points + ROCK_POINTS;
    } else if play.me == ME_PAPER {
        points = points + PAPER_POINTS;
    } else {
        points = points + SCISSORS_POINTS;
    }

    return points;
}

fn get_plays_puzzle_one() -> Vec<Play> {
    return read_file()
        .lines()
        .map(|line| -> Play {
            let mut splits = line.split_whitespace();
            let oponent = splits.next().expect("No oponent move").to_owned();
            let me = splits.next().expect("No move").to_owned();
            return Play { me: me, oponent: oponent }
        })
        .collect();
}

fn get_plays_puzzle_two() -> Vec<Play> {
    return read_file()
        .lines()
        .map(|line| -> Play {
            let mut splits = line.split_whitespace();
            let oponent = splits.next().expect("No oponent move").to_owned();
            let expected_result = splits.next().expect("No move").to_owned();
            let mut me = oponent.to_owned();
            if expected_result == SHOULD_WIN {
                if oponent == OPONENT_PAPER {
                    me = ME_SCISSORS.to_owned();
                } else if oponent == OPONENT_ROCK {
                    me = ME_PAPER.to_owned();
                } else if oponent == OPONENT_SCISSORS {
                    me = ME_ROCK.to_owned();
                }
            } else if expected_result == SHOULD_LOSE {
                if oponent == OPONENT_PAPER {
                    me = ME_ROCK.to_owned();
                } else if oponent == OPONENT_ROCK {
                    me = ME_SCISSORS.to_owned();
                } else if oponent == OPONENT_SCISSORS {
                    me = ME_PAPER.to_owned();
                }
            } else {
                if oponent == OPONENT_PAPER {
                    me = ME_PAPER.to_owned();
                } else if oponent == OPONENT_ROCK {
                    me = ME_ROCK.to_owned();
                } else if oponent == OPONENT_SCISSORS {
                    me = ME_SCISSORS.to_owned();
                }
            }
            
            return Play { me: me, oponent: oponent };
        })
        .collect();
}

#[cfg(test)]
mod tests {
    #[test]
    fn puzzle_one() {
        let result = super::puzzle_one();
        assert_eq!(result, 10404);
    }

    #[test]
    fn puzzle_two() {
        let result = super::puzzle_two();
        assert_eq!(result, 10334);
    }
}
