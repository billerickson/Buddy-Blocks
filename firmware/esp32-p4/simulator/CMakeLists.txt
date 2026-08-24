cmake_minimum_required(VERSION 3.20)
project(buddy_blocks_simulator LANGUAGES C CXX)

set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(BUDDY_FIRMWARE_ROOT "${CMAKE_CURRENT_LIST_DIR}/..")
set(LVGL_ROOT "${BUDDY_FIRMWARE_ROOT}/managed_components/lvgl__lvgl")
if(NOT EXISTS "${LVGL_ROOT}/CMakeLists.txt")
  message(FATAL_ERROR
    "Pinned LVGL sources are missing. Run ./scripts/firmware-bootstrap.sh first.")
endif()

set(LV_BUILD_CONF_PATH "" CACHE PATH "" FORCE)
set(LV_BUILD_CONF_DIR "${CMAKE_CURRENT_LIST_DIR}" CACHE PATH "" FORCE)
set(CONFIG_LV_BUILD_DEMOS OFF CACHE BOOL "" FORCE)
set(CONFIG_LV_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(CONFIG_LV_USE_THORVG_INTERNAL OFF CACHE BOOL "" FORCE)
add_subdirectory("${LVGL_ROOT}" "${CMAKE_BINARY_DIR}/lvgl")

add_executable(buddy_blocks_simulator
  simulator.cpp
  "${BUDDY_FIRMWARE_ROOT}/components/buddy_ui/buddy_ui.cpp"
  "${BUDDY_FIRMWARE_ROOT}/components/buddy_domain/buddy_domain.cpp"
)
target_include_directories(buddy_blocks_simulator PRIVATE
  "${BUDDY_FIRMWARE_ROOT}/components/buddy_ui/include"
  "${BUDDY_FIRMWARE_ROOT}/components/buddy_domain/include"
)
target_link_libraries(buddy_blocks_simulator PRIVATE lvgl::lvgl)
target_compile_options(buddy_blocks_simulator PRIVATE -Wall -Wextra -Werror)
