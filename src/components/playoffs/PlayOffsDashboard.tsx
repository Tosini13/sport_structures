import React, { useState } from "react";

import { menuPlayOffsConst } from "../../const/menuConst";
import { tournament } from "../../models/tournament";
import {
  BracketNavItemStyled,
  BracketNavMenuStyled,
  BracketNavStyled,
} from "../../styled/styledBracket";
import PlayOffsBracket from "./PlayOffsBracket";
import PlayOffsChooseLastMatchPlace from "./create/PlayOffsChooseLastMatchPlace";
import PlayOffsChooseRound from "./create/PlayOffsChooseRound";
import PlayOffsRound from "./PlayOffsRound";

const PlayOffsDashboard = () => {
  const [view, setView] = useState(menuPlayOffsConst.round);

  return (
    <div>
      <BracketNavStyled>
        <BracketNavMenuStyled>
          <BracketNavItemStyled
            selected={Boolean(view === menuPlayOffsConst.round)}
            onClick={() => setView(menuPlayOffsConst.round)}
          >
            Round
          </BracketNavItemStyled>
          <BracketNavItemStyled
            selected={Boolean(view === menuPlayOffsConst.bracket)}
            onClick={() => setView(menuPlayOffsConst.bracket)}
          >
            Bracket
          </BracketNavItemStyled>
          <BracketNavItemStyled
            selected={false}
            onClick={() => {
              tournament.convertBracket();
            }}
          >
            Convert Bracket
          </BracketNavItemStyled>
        </BracketNavMenuStyled>
        {/* <BracketNavMenuStyled>
          <PlayOffsChooseRound />
          <PlayOffsChooseLastMatchPlace />
        </BracketNavMenuStyled> */}
      </BracketNavStyled>
      {view === menuPlayOffsConst.round ? <PlayOffsRound /> : null}
      {view === menuPlayOffsConst.bracket ? <PlayOffsBracket /> : null}
    </div>
  );
};

export default PlayOffsDashboard;
