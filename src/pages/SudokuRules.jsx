import Heading from "../atoms/Headings";
import Card from "../components/Card";
import basicExample from "../design/images/basic-rules-example.png";
import basicSolve from "../design/images/basic-solve-example.png";
import basicGuess from "../design/images/basic-guess-example.png";
import basicPencil from "../design/images/basic-pencil-example.png";

const SudokuRules = () => {
  return (
    <div className="flex flex-col items-center set-height w-screen">
      <header className="mb-8 motion-preset-slide-right">
        <Heading tag={"h2"} title="Basic Rules" />
      </header>
      <div className="flex justify-center flex-row flex-wrap">
        <Card
          headingTitle={"What is Sudoku?"}
          imgSrc={basicExample}
          imgAlt={"Sudoku Board"}
        >
          <p className="pb-4">
            Sudoku is played on a grid of 9 x 9 spaces. Within the rows and
            columns are 9 “squares” (made up of 3 x 3 spaces). Each row, column
            and square (9 spaces each) needs to be filled out with the numbers
            1-9, without repeating any numbers within the row, column or square.
          </p>
          <p className="pb-4">
            As an example from the image above, each Sudoku grid comes with a
            few spaces already filled in; the more spaces filled in, the easier
            the game – the more difficult Sudoku puzzles have very few spaces
            that are already filled in.
          </p>
        </Card>

        <Card
          headingTitle={"Try Not to Guess"}
          imgSrc={basicGuess}
          imgAlt={"question mark over a tough location on the board"}
        >
          <p className="pb-4">
            Sudoku is a game of logic and reasoning, so try not to guess. If you
            don’t know what number to put in a certain space, keep scanning the
            other areas of the grid until you seen an opportunity to place a
            number. Don’t try to force anything – Sudoku rewards patience and
            pattern recognition, not so much with guessing.
          </p>
          <p className="pb-4">
            In the image above the question mark space could be a few numbers.
            Instead of trying to place a guess and hope for the best, you can
            use the pencil marks to 'write down' your thoughts. That way once
            you start filling out the board and are able to come back to this
            spot, you have a better idea of where to go.
          </p>
        </Card>

        <Card
          headingTitle={"No Repeats"}
          imgSrc={basicSolve}
          imgAlt={"Solving a board for 2"}
        >
          <p className="pb-4">
            For an example of how to solve in the middle left square (circled in
            blue), this square already has 7 out of the 9 spaces filled in. The
            only numbers missing from the square are 2 and 8. By seeing which
            numbers are missing from each square, row, or column, we can use
            process of elimination.
          </p>
          <p className="pb-4">
            Here you can also use the location of the other 2s to fill in the
            missing blank. Even with the mostly empty row and column, we can
            determine that 2 belongs in this space. Now we have a better
            understanding of where the 8 belongs since its the last remaining
            space, and helps us in future number solving.
          </p>
        </Card>

        <Card
          headingTitle={"Pencil Marks Are Your Friend"}
          imgSrc={basicPencil}
          imgAlt={"pencil markings for 4 and 7 on the board"}
        >
          <p className="pb-4">
            Sometimes you just can't tell what a number is for a given location.
            But you have a relative idea of what could go there. From the
            example above for the top right box, we're not sure if it could be a
            four or seven. But by placing markings here we can easily see what
            to look for once we get back to this box. We won't have to remember
            what to place there, since visually we can see what could go there.
            Eases the process of elimination for other boxes as well.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SudokuRules;
