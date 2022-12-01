use std::fs;

fn main() {
    puzzle_one();
    puzzle_two();
}

fn read_file() -> String {
    return fs::read_to_string("./input.txt").expect("Could not read the file");
}

fn get_elfs_food() -> Vec<Vec<i32>> {
    return read_file()
        .split("\n\n")
        .map(|elf| -> Vec<i32> {
            return elf.lines().map(|line| line.parse().expect("Parse error")).collect()
        }).collect();
}

fn get_elfs_calories() -> Vec<i32> {
    return get_elfs_food()
        .iter()
        .map(|food| -> i32 {
            return food.iter().sum()
        }).collect();
}

fn puzzle_one() -> i32 {
    return *get_elfs_calories().iter().max().unwrap();
}

fn puzzle_two() -> i32 {
    let mut elfs_calories = get_elfs_calories();
    elfs_calories.sort();
    return elfs_calories[elfs_calories.len()-3..].iter().sum();
}

#[cfg(test)]
mod tests {
    #[test]
    fn puzzle_one() {
        let result = super::puzzle_one();
        assert_eq!(result, 71934);
    }

    #[test]
    fn puzzle_two() {
        let result = super::puzzle_two();
        assert_eq!(result, 211447);
    }
}