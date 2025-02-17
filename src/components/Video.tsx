
import ReactPlayer from 'react-player'
import { useAppDispatch, useAppSelector } from '../store';
import { next, useCurrentLesson } from '../store/slices/player';
import { Loader } from 'lucide-react';
export function Video() {
  const dispatch = useAppDispatch()
  const {currentLesson} = useCurrentLesson()
  const isCourseLoading = useAppSelector(state=>state.player.isLoading)
  console.log(isCourseLoading,'player')

  const lesson = useAppSelector(state=>{
    const {currentLessonIndex, currentModuleIndex} = state.player
    const currentLesson = 
      state.player.course?.modules[currentModuleIndex].lessons[currentLessonIndex]
      return currentLesson
  })

  function handleNext(){
    dispatch(next())
  }
  
  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ):(
        <ReactPlayer
          onEnded={handleNext}
          playing={true}
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}