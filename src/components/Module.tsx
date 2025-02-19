import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}
export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const dispatch = useAppDispatch()
  const isCourseLoading = useAppSelector(state=>state.player.isLoading)
  console.log(isCourseLoading,'Module')

  const {currentLessonIndex, currentModuleIndex} = useAppSelector(state=>{
    const {currentLessonIndex, currentModuleIndex} = state.player
    return {currentLessonIndex, currentModuleIndex}
  })


  const lessons = useAppSelector(state=>{
    return state.player.course?.modules[moduleIndex].lessons
  })

  return (
    <>
      {isCourseLoading ? (
        <Collapsible className="group" defaultOpen={moduleIndex ===0}>
          <CollapsibleTrigger  className="flex w-full items-center gap-3 bg-zinc-800 p-4">
            <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
              
            </div>
          </CollapsibleTrigger>
        </Collapsible>
        ) : (
          <Collapsible className="group" defaultOpen={moduleIndex ===0}>
            <CollapsibleTrigger  className="flex w-full items-center gap-3 bg-zinc-800 p-4">
              <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
                {moduleIndex + 1}
              </div>
              <div className="flex flex-col gap-1 text-left">
                <strong className="text-sm">{title}</strong>
                <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
              </div>
              <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <nav className="relative flex flex-col gap-4 p-6">
                {lessons && lessons.map((lesson,lessonIndex)=>{
                  const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex
                  return(
                    <Lesson 
                      key={lesson.id} 
                      title={lesson.title} 
                      duration={lesson.duration}
                      onPlay={()=>{dispatch(play([moduleIndex, lessonIndex]))}}
                      isCurrent = {isCurrent}

                    />
                  )
                })}

              
            </nav>
            
            </CollapsibleContent>
          </Collapsible>
        )
      }
  </>
  );
}