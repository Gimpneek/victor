from behave import *


@given('I have {starting_apples} apples')
def impl(ctx, starting_apples):
    ctx.starting_apples = int(starting_apples.replace('"', ''))


@when('I get given {more_apples} apples')
def impl(ctx, more_apples):
    ctx.final_apples = ctx.starting_apples + int(more_apples.replace('"', ''))


@when('I give away {less_apples} apples')
def impl(ctx, less_apples):
    ctx.final_apples = ctx.starting_apples - int(less_apples.replace('"', ''))


@then('I should have {sum_of_apples} apples')
def impl(ctx, sum_of_apples):
    assert ctx.final_apples == int(sum_of_apples.replace('"', ''))


@when('I multiply my apples by {apples}')
def impl(ctx, apples):
    ctx.final_apples = ctx.starting_apples * int(apples.replace('"', ''))


