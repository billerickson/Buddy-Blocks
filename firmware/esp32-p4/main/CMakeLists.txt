idf_component_register(
  SRCS "app_main.cpp"
  INCLUDE_DIRS "."
  REQUIRES buddy_board
)

target_compile_options(${COMPONENT_LIB} PRIVATE -fno-exceptions -fno-rtti)
