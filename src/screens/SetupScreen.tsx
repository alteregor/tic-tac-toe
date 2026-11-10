import { type FirstMove, type Settings, useSetupForm } from "../model"
import { Button } from "../ui/Button"
import { ChoiceGroup, ChoiceTile } from "../ui/ChoiceTile"
import { Screen } from "../ui/Screen"
import { SectionLabel } from "../ui/SectionLabel"
import { SegmentedControl } from "../ui/SegmentedControl"
import { Title } from "../ui/Title"
import { PeopleIcon, RobotIcon } from "../ui/icons"

const firstMoveOptions: { value: FirstMove; label: string }[] = [
  { value: "me", label: "Me" },
  { value: "computer", label: "Computer" },
]

export function SetupScreen({
  initial,
  onStart,
}: {
  initial: Settings
  onStart: (settings: Settings) => void
}) {
  const { settings, setOpponent, setFirstMove } = useSetupForm(initial)
  const { opponent, firstMove } = settings

  return (
    <Screen>
      <Title>Tic-Tac-Toe</Title>

      <div className="my-auto flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <SectionLabel>Play against</SectionLabel>
          <ChoiceGroup label="Play against">
            <ChoiceTile
              label="Human"
              selected={opponent === "human"}
              onSelect={() => setOpponent("human")}
            >
              <PeopleIcon className="w-[58%]" />
            </ChoiceTile>
            <ChoiceTile
              label="Computer"
              selected={opponent === "computer"}
              onSelect={() => setOpponent("computer")}
            >
              <RobotIcon className="w-[52%]" />
            </ChoiceTile>
          </ChoiceGroup>
        </section>

        <section
          inert={opponent !== "computer"}
          className={`flex flex-col gap-4 transition-opacity duration-200 ${opponent === "computer" ? "" : "opacity-0"}`}
        >
          <SectionLabel>Who goes first?</SectionLabel>
          <SegmentedControl
            label="Who goes first?"
            options={firstMoveOptions}
            value={firstMove}
            onChange={setFirstMove}
          />
        </section>
      </div>

      <Button onClick={() => onStart(settings)}>Start Game</Button>
    </Screen>
  )
}
