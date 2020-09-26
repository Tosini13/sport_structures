import { observer } from "mobx-react";
import React from "react";
import { Options } from "../../../models/bracket";

import {
  ButtonErrorStyled,
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
} from "../../../styled/styledButtons";
import PlayOffsChooseLastMatchPlace from "./PlayOffsChooseLastMatchPlace";
import PlayOffsChooseRound from "./PlayOffsChooseRound";

type Props = {
  toggleCreate: () => void;
  options: Options;
  setOptions: (options: Options) => void;
  submitBracket: () => void;
};

const PlayOffsCreateMenu: React.FC<Props> = observer(
  ({ toggleCreate, options, setOptions, submitBracket }) => {
    return (
      <>
        <ButtonHorizontalContainerStyled>
          <ButtonErrorStyled
            variant="outlined"
            color="secondary"
            onClick={toggleCreate}
          >
            Anuluj
          </ButtonErrorStyled>
          <ButtonSuccessStyled
            variant="outlined"
            color="secondary"
            onClick={submitBracket}
          >
            Stwórz
          </ButtonSuccessStyled>
        </ButtonHorizontalContainerStyled>
        <ButtonHorizontalContainerStyled>
          <PlayOffsChooseRound options={options} setOptions={setOptions} />
          <PlayOffsChooseLastMatchPlace
            options={options}
            setOptions={setOptions}
          />
        </ButtonHorizontalContainerStyled>
      </>
    );
  }
);

export default PlayOffsCreateMenu;
