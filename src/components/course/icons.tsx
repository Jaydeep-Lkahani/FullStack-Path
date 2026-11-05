/**
 * The site's only icon source (Lucide). Stroke width follows the size rules in UI-UX.md §6.2:
 * 14px → 2.25, 16px → 2, 20px → 1.75, 24px+ → 1.5. Icons are decorative by default
 * (aria-hidden); give the surrounding control an accessible name instead.
 */
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Circle,
  CircleCheck,
  CircleDot,
  CirclePlay,
  CircleX,
  Clock,
  Clock3,
  Code,
  Copy,
  CornerDownRight,
  Eye,
  GripHorizontal,
  Hammer,
  Info,
  Keyboard,
  Laptop,
  Layers,
  Lightbulb,
  Link as LinkGlyph,
  List,
  ListChecks,
  Menu,
  Milestone,
  Minimize2,
  Minus,
  Monitor,
  Moon,
  PictureInPicture2,
  Play,
  Plus,
  Puzzle,
  Rocket,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  Target,
  Terminal,
  Trophy,
  TriangleAlert,
  Undo2,
  X,
  type LucideIcon,
} from "lucide-react";

type IconProps = { className?: string; strokeWidth?: number };

/** Picks the stroke width from the Tailwind size class so every icon looks equally weighted. */
function strokeFor(className = "") {
  const m = /(?:^|\s)size-(\d+(?:\.\d+)?)/.exec(className);
  const size = m ? Number(m[1]) * 4 : 16;
  if (size <= 14) return 2.25;
  if (size <= 16) return 2;
  if (size <= 20) return 1.75;
  return 1.5;
}

function make(Glyph: LucideIcon) {
  function Icon({ className = "size-4", strokeWidth }: IconProps) {
    return (
      <Glyph
        aria-hidden
        focusable={false}
        className={className}
        strokeWidth={strokeWidth ?? strokeFor(className)}
      />
    );
  }
  return Icon;
}

export const ArrowRightIcon = make(ArrowRight);
export const ArrowLeftIcon = make(ArrowLeft);
export const ArrowUpIcon = make(ArrowUp);
export const ArrowDownIcon = make(ArrowDown);
export const ExternalLinkIcon = make(ArrowUpRight);
export const CheckIcon = make(Check);
export const ChevronDownIcon = make(ChevronDown);
export const ClockIcon = make(Clock);
export const SoonIcon = make(Clock3);
export const BookOpenIcon = make(BookOpen);
export const PlayCircleIcon = make(CirclePlay);
export const PlayIcon = make(Play);
export const ListChecksIcon = make(ListChecks);
export const CodeIcon = make(Code);
export const SparklesIcon = make(Sparkles);
export const LayersIcon = make(Layers);
export const RotateCcwIcon = make(RotateCcw);
export const InfoIcon = make(Info);
export const LightbulbIcon = make(Lightbulb);
export const AlertTriangleIcon = make(TriangleAlert);
export const PuzzleIcon = make(Puzzle);
export const ListIcon = make(List);
export const TargetIcon = make(Target);
export const CopyIcon = make(Copy);
export const PictureInPictureIcon = make(PictureInPicture2);
export const MinimizeIcon = make(Minimize2);
export const PlusIcon = make(Plus);
export const MinusIcon = make(Minus);
export const GripIcon = make(GripHorizontal);
export const NotStartedIcon = make(Circle);
export const CurrentIcon = make(CircleDot);
export const DoneIcon = make(CircleCheck);
export const CorrectIcon = make(CircleCheck);
export const WrongIcon = make(CircleX);
export const MilestoneIcon = make(Milestone);
export const ProjectIcon = make(Hammer);
export const StretchIcon = make(Rocket);
export const EyeIcon = make(Eye);
export const KeyboardIcon = make(Keyboard);
export const MenuIcon = make(Menu);
export const CloseIcon = make(X);
export const SunIcon = make(Sun);
export const MoonIcon = make(Moon);
export const MonitorIcon = make(Monitor);
export const ResumeIcon = make(CornerDownRight);
export const TerminalIcon = make(Terminal);
export const LaptopIcon = make(Laptop);
export const UndoIcon = make(Undo2);
export const LinkIcon = make(LinkGlyph);
export const SearchIcon = make(Search);
export const TrophyIcon = make(Trophy);
