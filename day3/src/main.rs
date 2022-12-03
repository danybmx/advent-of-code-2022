use std::{fs};

struct Compartment {
    left: String,
    right: String
}

fn main() {
    let result = puzzle_one();
    println!("Puzzle 1: {result}");
    let result = puzzle_two();
    println!("Puzzle 2: {result}");
}

fn puzzle_one() -> i32 {
    get_compartments()
        .iter()
        .map(|compartment| get_common(compartment))
        .map(|common| get_value(common))
        .sum()
}

fn puzzle_two() -> i32 {
    return get_groups()
        .iter()
        .map(|group| get_common_for_group(group.to_owned()))
        .map(|common| get_value(common))
        .sum();
}

fn read_file() -> String {
    fs::read_to_string("./input.txt").expect("Could not load the file")
}

fn get_compartments() -> Vec<Compartment> {
    read_file()
        .lines()
        .map(|line| {
            let compartment_length = line.len() / 2;
            let left = line.chars().take(compartment_length).collect();
            let right = line.chars().skip(compartment_length).take(compartment_length).collect();
            Compartment { left: left, right: right }
        })
        .collect()
}

fn get_common(compartment: &Compartment) -> char {
    return compartment
        .left
        .chars()
        .find(|c| compartment.right.contains(*c))
        .to_owned()
        .expect("No identical items found");
}

fn get_common_for_group(group: Vec<String>) -> char {
    let first = group.get(0).expect("No first group");
    let second = group.get(1).expect("No second group");
    let third = group.get(2).expect("No third group");

    return first
        .chars()
        .find(|c| second.contains(*c) && third.contains(*c))
        .to_owned()
        .expect("No identical items found");
}

fn get_value(letter: char) -> i32 {
    let mut value = letter as i32 - 96;
    if letter.is_uppercase() {
        value = letter as i32 - 38;
    }
    return value;
}

fn get_groups() -> Vec<Vec<String>> {
    let lines: Vec<String> = read_file()
        .lines()
        .map(|line| line.to_owned())
        .collect();
    return lines.chunks(3).map(|c| c.to_vec()).collect();
}

#[cfg(test)]
mod tests {
    #[test]
    fn puzzle_one() {
        let result = super::puzzle_one();
        assert_eq!(result, 7737);
    }

    #[test]
    fn puzzle_two() {
        let result = super::puzzle_two();
        assert_eq!(result, 2697); // 2679
    }
}